import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VoidResult, OptionalResult, PaginatedResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {Siret} from "@domain/shared/value-object/Siret";

export interface MaintenanceRepository {
    store(maintenance: Maintenance): Promise<VoidResult>
    update(maintenanceId: string): Promise<VoidResult>
    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>>
    listVehiculeMaintenance(vehiculeImmatriculation: string): Promise<VoidResult>
    listGarageMaintenances(garageSiret: Siret, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
}