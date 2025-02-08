import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VoidResult, OptionalResult, PaginatedResult, Result} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {Siret} from "@domain/shared/value-object/Siret";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

export type ListGarageMaintenancesResult<T extends boolean> = T extends true
    ? PaginatedResult<Maintenance>
    : Result<Maintenance[]>;


export interface MaintenanceRepository {
    store(maintenance: Maintenance): Promise<VoidResult>
    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>>
    listVehicleMaintenance(vehicleImmatriculation: VehicleImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
    listGarageMaintenances<T extends boolean = true>(garageSiret: Siret, pagination?: T extends true ? PaginatedInput : undefined): Promise<ListGarageMaintenancesResult<T>>
    listMaintenance(pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>>
}