import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VoidResult, OptionalResult} from "@shared/Result";

export interface MaintenanceRepository {
    store(maintenance: Maintenance): Promise<VoidResult>
    update(maintenanceId: string): Promise<VoidResult>
    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>>
    listVehiculeMaintenance(vehiculeImmatriculation: string): Promise<VoidResult>
}