import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class Driver{
    constructor(
        private readonly driverLicenceId: DriverLicenseId,
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly email: string,
        private readonly driverLicensedAt: Date,
    ) {}

    patch(partialDriver: Partial<Driver>){
        const updatedProperties = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            ...partialDriver
        };

        return new Driver(
            this.driverLicenceId,
            updatedProperties.firstName,
            updatedProperties.lastName,
            updatedProperties.email,
            this.driverLicensedAt
        );
    }
}