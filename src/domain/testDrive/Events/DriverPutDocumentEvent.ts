import {AbstractEvent} from "@shared/AbstractEvent";
import {DriverDocumentsTypes} from "@domain/testDrive/enums/DriverDocumentsTypes";

interface DriverPutDocumentPayload {
    driverLicenseId: string,
    documents : {
        name: string,
        type: DriverDocumentsTypes,
        description: string,
        hash: string,
        extension: string
    }[]
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