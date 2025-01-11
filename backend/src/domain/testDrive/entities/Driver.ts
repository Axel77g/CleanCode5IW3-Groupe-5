import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {DriverDocuments} from "../value-object/DriverDocuments";

export interface DriverDTO{
    driverLicenseId: string;
    firstName: string;
    lastName: string;
    email: string;
    driverLicensedAt: Date;
    documents : DriverDocuments[];
}

export class Driver{
    constructor(
        public readonly driverLicenseId: DriverLicenseId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly driverLicensedAt: Date,
        public readonly documents : DriverDocuments[]
    ) {}


    static fromObject(object: DriverDTO) : Driver | Error {
        const driverLicenseId = DriverLicenseId.create(object.driverLicenseId);
        if(driverLicenseId instanceof Error) return driverLicenseId;
        return new Driver(
            driverLicenseId,
            object.firstName,
            object.lastName,
            object.email,
            object.driverLicensedAt,
            object.documents
        )
    }

}