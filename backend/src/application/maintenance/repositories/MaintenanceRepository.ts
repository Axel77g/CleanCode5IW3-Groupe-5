import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VoidResult, OptionalResult} from "@shared/Result";

export interface MaintenanceRepository {
    store(maintenance: Maintenance): Promise<VoidResult>
    update(maintenance: Maintenance): Promise<VoidResult>
    getByMaintenanceId(maintenance: Maintenance): Promise<OptionalResult<Maintenance>>
}