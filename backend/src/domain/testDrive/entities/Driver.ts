import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class Driver{
    constructor(
        public readonly driverLicenceId: DriverLicenseId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly driverLicensedAt: Date,
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