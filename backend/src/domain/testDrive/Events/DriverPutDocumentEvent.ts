import {AbstractEvent} from "@shared/AbstractEvent";

interface DriverPutDocumentPayload {
    driverLicenseId: string,
    name: string,
    type: string,
    description: string,
}
export class DriverPutDocumentEvent extends AbstractEvent{
    static type = "DRIVER_PUT_DOCUMENT"
    readonly type = DriverPutDocumentEvent.type;

    readonly streamId: string;
    readonly payload : DriverPutDocumentPayload
    constructor(
        payload : DriverPutDocumentPayload
    ) {
        super();
        this.streamId = `driver-${payload.driverLicenseId}`
        this.payload = payload
    }
}