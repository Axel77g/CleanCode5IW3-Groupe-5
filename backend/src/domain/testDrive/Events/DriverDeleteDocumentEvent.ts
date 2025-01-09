import {AbstractEvent} from "../../../shared/AbstractEvent";

interface DriverDeleteDocumentPayload {
    driverLicenseId: string,
    name: string,
}

export class DriverDeleteDocumentEvent extends AbstractEvent{
    static type = "DRIVER_DELETED"
    readonly type = DriverDeleteDocumentEvent.type;


    readonly streamId: string;
    readonly payload : DriverDeleteDocumentPayload
    constructor(
        payload : DriverDeleteDocumentPayload
    ) {
        super();
        this.streamId = `driver-${payload.driverLicenseId}`
        this.payload = payload
    }
}