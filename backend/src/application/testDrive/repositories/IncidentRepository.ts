import {IRepository} from "@shared/IRepository";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, VoidResult} from "@shared/Result";
import {Incident} from "@domain/testDrive/entities/Incident";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";

export interface IncidentRepository extends IRepository{
    listDriverIncidents(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<Incident>>;
    store(incident: Incident): Promise<VoidResult>;
}