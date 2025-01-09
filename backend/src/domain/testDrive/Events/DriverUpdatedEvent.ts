import {AbstractEvent} from "../../../shared/AbstractEvent";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

interface DriverUpdatedEventPayload {
    driverLicenseId: string;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
}
export class DriverUpdatedEvent extends AbstractEvent{
    readonly streamId: string;
    readonly payload: DriverUpdatedEventPayload;
    readonly type = "DRIVER_UPDATED"
    constructor(
        driverUpdateEventPayload: DriverUpdatedEventPayload
    ) {
        super();
        this.streamId = 'driver-' + driverUpdateEventPayload.driverLicenseId
        this.payload = driverUpdateEventPayload;
    }
}