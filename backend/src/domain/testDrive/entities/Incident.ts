import {IncidentType} from "../enums/IncidentType";
import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";

export interface IncidentDTO{
    incidentId: string;
    driverLicenseId: string;
    description: string;
    type: string | IncidentType;
    date: Date;
}

export class Incident{
    constructor(
        public readonly incidentId: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly type : IncidentType,
        public readonly description: string,
        public readonly date: Date,
    ) {}

    static fromObject(object: IncidentDTO) : Incident | ApplicationException {
        const driverLicenseId = DriverLicenseId.create(object.driverLicenseId);
        if(driverLicenseId instanceof ApplicationException) return driverLicenseId;
        return new Incident(
            object.incidentId,
            driverLicenseId,
            object.type as IncidentType,
            object.description,
            object.date
        )
    }
}