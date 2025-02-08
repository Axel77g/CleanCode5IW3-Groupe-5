import {AbstractEvent} from "@shared/AbstractEvent";

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
        const cleanedPayload = {...payload}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        Object.keys(cleanedPayload).forEach((key:string) => cleanedPayload[key] === undefined && delete cleanedPayload[key]);
        this.payload = cleanedPayload;
    }
}