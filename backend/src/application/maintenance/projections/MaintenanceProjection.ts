import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {Result, VoidResult} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {ApplicationException} from "@shared/ApplicationException";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";

export class MaintenanceProjection extends AbstractProjection {
    constructor(private _maintenanceRepository: MaintenanceRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler): void {
        projectionJobScheduler.schedule(RegisterMaintenanceEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateMaintenanceEvent.type, this.constructor.name)
    }

    bindEvents(): { [key: string]: (event: any) => Promise<VoidResult>; } {
        return {
            [RegisterMaintenanceEvent.type]: this.applyRegisterEvent,
            [UpdateMaintenanceEvent.type]: this.applyUpdateEvent,
        }
    }

    async applyRegisterEvent(event: RegisterMaintenanceEvent): Promise<VoidResult> {
        const maintenance = Maintenance.fromObject(event.payload)
        if (maintenance instanceof ApplicationException) return Result.Failure(maintenance)
        return this._maintenanceRepository.store(maintenance)
    }

    async applyUpdateEvent(event: UpdateMaintenanceEvent): Promise<VoidResult> {
        const maintenance = await this._maintenanceRepository.getByMaintenanceId(event.payload.maintenanceId)
        if (!maintenance.success) return Result.FailureStr("Cannot delete maintenances")
        if(maintenance.empty) return Result.FailureStr("Maintenance not found, this should not happen")
        const updatedMaintenance = maintenance.value.update(event.payload)
        if (updatedMaintenance instanceof ApplicationException) return Result.FailureStr("Cannot update maintenances")
        return this._maintenanceRepository.store(updatedMaintenance);
    }
}