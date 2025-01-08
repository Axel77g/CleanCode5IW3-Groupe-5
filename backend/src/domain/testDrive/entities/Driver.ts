import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {DriverDocuments} from "../value-object/DriverDocuments";

export class Driver{
    constructor(
        public readonly driverLicenceId: DriverLicenseId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly driverLicensedAt: Date,
        public readonly documents : DriverDocuments[]
    ) {}


}