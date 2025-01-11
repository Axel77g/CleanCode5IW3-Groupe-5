import {AbstractEvent} from "@shared/AbstractEvent";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

interface DriverUpdatedEventPayload {
    driverLicenseId: string;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
}
export class DriverUpdatedEvent extends AbstractEvent{
    static type = "DRIVER_UPDATED"
    readonly type = DriverUpdatedEvent.type;

    readonly streamId: string;
    readonly payload: DriverUpdatedEventPayload;
    constructor(
        payload: DriverUpdatedEventPayload
    ) {
        super();
        this.streamId = `driver-${payload.driverLicenseId}`
        let cleanedPayload = {...payload}
        //@ts-ignore
        Object.keys(cleanedPayload).forEach((key:string) => cleanedPayload[key] === undefined && delete cleanedPayload[key]);
        this.payload = cleanedPayload;
    }
}