import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {DriverDocuments} from "../value-object/DriverDocuments";
import {ApplicationException} from "@shared/ApplicationException";
import {DriverCreatedEvent} from "@domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "@domain/testDrive/Events/DriverUpdatedEvent";

export interface DriverDTO{
    driverLicenseId: string;
    firstName: string;
    lastName: string;
    email: string;
    driverLicensedAt: Date;
    documents : DriverDocuments[];
}

export class Driver{
    static errors = {
        INVALID_DRIVER_LICENSE_DATE: new ApplicationException("Driver.INVALID_DRIVER_LICENSE_DATE", "Invalid driver license date"),
    }

    constructor(
        public readonly driverLicenseId: DriverLicenseId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly driverLicensedAt: Date,
        public readonly documents : DriverDocuments[]
    ) {}


    static fromObject(object: DriverDTO) : Driver | ApplicationException {
        const driverLicenseId = DriverLicenseId.create(object.driverLicenseId);
        if(driverLicenseId instanceof ApplicationException) return driverLicenseId;
        return Driver.create({
            driverLicenseId,
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            driverLicensedAt: object.driverLicensedAt,
            documents: object.documents
        })
    }

    static create(object : {
        driverLicenseId: DriverLicenseId,
        firstName: string,
        lastName: string,
        email: string,
        driverLicensedAt: Date,
        documents : DriverDocuments[]
    }) {
        if (object.driverLicensedAt > new Date()) return Driver.errors.INVALID_DRIVER_LICENSE_DATE;
        return new Driver(
            object.driverLicenseId,
            object.firstName,
            object.lastName,
            object.email,
            object.driverLicensedAt,
            object.documents
        )
    }

    createEvent() : DriverCreatedEvent {
        return new DriverCreatedEvent({
            driverLicenseId: this.driverLicenseId.getValue(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            driverLicensedAt: this.driverLicensedAt,
            documents: this.documents
        })
    }

    update(object : {
        firstName ?: string,
        lastName ?: string,
        email ?: string,
    }){
        return new Driver(
            this.driverLicenseId,
            object.firstName || this.firstName,
            object.lastName || this.lastName,
            object.email || this.email,
            this.driverLicensedAt,
            this.documents
        )
    }

    updateEvent(): DriverUpdatedEvent {
        return new DriverUpdatedEvent({
            driverLicenseId: this.driverLicenseId.getValue(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        })
    }

}