import {IncidentType} from "../enums/IncidentType";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class Incident{
    constructor(
        public readonly id: string,
        public readonly driverLicenceId: DriverLicenseId,
        public readonly type : IncidentType,
        public readonly description: string,
        public readonly date: Date,
    ) {}
}