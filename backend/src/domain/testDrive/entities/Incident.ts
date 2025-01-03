import {IncidentType} from "../enums/IncidentType";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class Incident{
    constructor(
        private readonly driverLicenceId: DriverLicenseId,
        private readonly type : IncidentType,
        private readonly description: string,
        private readonly date: Date,
    ) {}
}