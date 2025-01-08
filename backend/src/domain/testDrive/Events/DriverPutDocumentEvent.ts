import {AbstractEvent} from "../../../shared/AbstractEvent";

export class DriverPutDocumentEvent extends AbstractEvent{
    readonly streamId: string;
    constructor(
        public readonly driverLicenceId: string,
        public readonly name: string,
        public readonly type: string,
        public readonly description: string,
    ) {
        super();
        this.streamId = 'driver-' + driverLicenceId;
    }
}