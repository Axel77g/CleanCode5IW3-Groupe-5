import {AbstractEvent} from "../../../shared/AbstractEvent";

export class DriverCreatedEvent extends AbstractEvent{
    readonly streamId: string;
    constructor(
        public readonly driverLicenceId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly driverLicensedAt: Date,
    ) {
        super();
        this.streamId = 'driver-' + driverLicenceId;
    }
}