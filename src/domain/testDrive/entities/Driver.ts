import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {DriverDocuments} from "../value-object/DriverDocuments";
import {ApplicationException} from "@shared/ApplicationException";
import {DriverCreatedEvent} from "@domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "@domain/testDrive/Events/DriverUpdatedEvent";
import {DriverPutDocumentEvent} from "@domain/testDrive/Events/DriverPutDocumentEvent";

export interface DriverDTO{
    driverLicenseId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    driverLicensedAt: Date;
    documents : DriverDocuments[];
}

export class Driver{
    static errors = {
        INVALID_DRIVER_LICENSE_DATE: new ApplicationException("Driver.INVALID_DRIVER_LICENSE_DATE", "Invalid driver license date"),
        NEED_TO_BE_18: new ApplicationException("Driver.NEED_TO_BE_18", "Driver need to be 18 years old")
    }

    constructor(
        public readonly driverLicenseId: DriverLicenseId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly birthDate: Date,
        public readonly driverLicensedAt: Date,
        public readonly documents : DriverDocuments[]
    ) {}


    addDocument(document: DriverDocuments){
        return new Driver(
            this.driverLicenseId,
            this.firstName,
            this.lastName,
            this.email,
            this.birthDate,
            this.driverLicensedAt,
            [...this.documents, document]
        )
    }

    removeDocument(document: DriverDocuments){
        return new Driver(
            this.driverLicenseId,
            this.firstName,
            this.lastName,
            this.email,
            this.birthDate,
            this.driverLicensedAt,
            this.documents.filter(doc => doc.hash !== document.hash)
        )
    }


    static fromObject(object: DriverDTO) : Driver | ApplicationException {
        const driverLicenseId = DriverLicenseId.create(object.driverLicenseId);
        if(driverLicenseId instanceof ApplicationException) return driverLicenseId;
        return Driver.create({
            driverLicenseId,
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            birthDate: object.birthDate,
            driverLicensedAt: object.driverLicensedAt,
            documents: object.documents
        })
    }

    static create(object : {
        driverLicenseId: DriverLicenseId,
        firstName: string,
        lastName: string,
        email: string,
        birthDate: Date,
        driverLicensedAt: Date,
        documents : DriverDocuments[]
    }) {
        if (object.driverLicensedAt > new Date()) return Driver.errors.INVALID_DRIVER_LICENSE_DATE;
        if(new Date().getFullYear() - object.birthDate.getFullYear() < 18) return Driver.errors.NEED_TO_BE_18;
        return new Driver(
            object.driverLicenseId,
            object.firstName,
            object.lastName,
            object.email,
            object.birthDate,
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
            birthDate: this.birthDate,
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
            this.birthDate,
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

    putDocumentsEvent(): DriverPutDocumentEvent {
        return new DriverPutDocumentEvent({
            driverLicenseId: this.driverLicenseId.getValue(),
            documents: this.documents.map(doc => ({
                name: doc.name,
                type: doc.type,
                description: doc.description,
                hash: doc.hash,
                extension: doc.extension
            }))
        })
    }

}