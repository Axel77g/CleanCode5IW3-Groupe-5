import {AbstractEvent} from "../../../shared/AbstractEvent";

export class DriverDeleteDocumentEvent extends AbstractEvent{
    readonly streamId: string;
    constructor(
        public readonly driverLicenceId: string,
        public readonly name: string,
    ) {
        super();
        this.streamId = 'driver-' + driverLicenceId;
    }
}