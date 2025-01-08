import {AbstractEvent} from "../../../shared/AbstractEvent";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class DriverUpdatedEvent extends AbstractEvent{
    readonly streamId: string;
    readonly driverLicenceId: string;
    constructor(
        driverLicenceId: DriverLicenseId,
        public readonly firstName: string | undefined,
        public readonly lastName: string | undefined,
        public readonly email: string | undefined
    ) {
        super();
        this.driverLicenceId = driverLicenceId.getValue();
        this.streamId = 'driver-' + driverLicenceId
    }
}