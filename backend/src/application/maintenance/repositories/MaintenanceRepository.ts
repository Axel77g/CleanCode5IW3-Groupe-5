import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VoidResult, OptionalResult, PaginatedResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {Siret} from "@domain/shared/value-object/Siret";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export interface MaintenanceRepository {
    store(maintenance: Maintenance): Promise<VoidResult>
    update(maintenanceId: string): Promise<VoidResult>
    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>>
    listVehiculeMaintenance(vehiculeImmatriculation: VehiculeImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
    listGarageMaintenances(garageSiret: Siret, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
    listMaintenance(pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
}