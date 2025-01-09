import {AbstractEvent} from "../../../shared/AbstractEvent";

interface DriverPutDocumentPayload {
    driverLicenceId: string,
    name: string,
    type: string,
    description: string,
}
export class DriverPutDocumentEvent extends AbstractEvent{
    readonly streamId: string;
    readonly payload : DriverPutDocumentPayload
    readonly type = "DRIVER_PUT_DOCUMENT"
    constructor(
        payload : DriverPutDocumentPayload
    ) {
        super();
        this.streamId = 'driver-' + payload.driverLicenceId;
        this.payload = payload
    }
}