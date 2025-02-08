import {IncidentType} from "../enums/IncidentType";
import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {RegisterIncidentEvent} from "@domain/testDrive/Events/RegisterIncidentEvent";
import {randomUUID} from "node:crypto";

export interface IncidentDTO{
    incidentId: string;
    driverLicenseId: string;
    description: string;
    type: string | IncidentType;
    date: Date;
}

export class Incident{
    private constructor(
        public readonly incidentId: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly type : IncidentType,
        public readonly description: string,
        public readonly date: Date,
    ) {}

    static fromObject(object: IncidentDTO) : Incident | ApplicationException {
        const driverLicenseId = DriverLicenseId.create(object.driverLicenseId);
        if(driverLicenseId instanceof ApplicationException) return driverLicenseId;
        return Incident.create({
            incidentId: object.incidentId,
            driverLicenseId,
            type: object.type,
            description: object.description,
            date: object.date
        })
    }

    static create(incident: {
        incidentId?: string,
        driverLicenseId: DriverLicenseId,
        type : string | IncidentType,
        description: string,
        date: Date,
    }) {
        if(!(incident.type in IncidentType)) return new ApplicationException('Incident.INVALID_INCIDENT_TYPE', 'Invalid incident type')
        return new Incident(
            incident.incidentId ?? randomUUID(),
            incident.driverLicenseId,
            incident.type as IncidentType,
            incident.description,
            incident.date
        )
    }

    registerEvent() : RegisterIncidentEvent {
        return new RegisterIncidentEvent({
            incidentId: this.incidentId,
            driverLicenseId: this.driverLicenseId.getValue(),
            type: this.type,
            description: this.description,
            date: this.date
        })
    }
}