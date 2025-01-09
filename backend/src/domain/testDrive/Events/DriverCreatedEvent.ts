import {AbstractEvent} from "../../../shared/AbstractEvent";


interface DriverCreatedEventPayload {
    driverLicenceId: string;
    firstName: string;
    lastName: string;
    email: string;
    driverLicensedAt: Date;
}
export class DriverCreatedEvent extends AbstractEvent{
    readonly streamId: string;
    readonly payload: DriverCreatedEventPayload;
    readonly type = "DRIVER_CREATED"
    constructor(driverCreatedEventPayload: DriverCreatedEventPayload) {
        super();
        this.streamId = 'driver-' + driverCreatedEventPayload.driverLicenceId;
        this.payload = driverCreatedEventPayload;
    }
}