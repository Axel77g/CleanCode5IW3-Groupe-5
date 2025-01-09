import {AbstractEvent} from "../../../shared/AbstractEvent";

interface DriverDeleteDocumentPayload {
    driverLicenceId: string,
    name: string,
}

export class DriverDeleteDocumentEvent extends AbstractEvent{
    readonly streamId: string;
    readonly type = "DRIVER_DELETED"
    readonly payload : DriverDeleteDocumentPayload
    constructor(
        payload : DriverDeleteDocumentPayload
    ) {
        super();
        this.streamId = 'driver-' + payload.driverLicenceId;
        this.payload = payload
    }
}