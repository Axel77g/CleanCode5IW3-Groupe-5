import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {Result, VoidResult} from "@shared/Result";
import {RegisterGarageEvent} from "@domain/maintenance/events/garage/RegisterGarageEvent";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {ApplicationException} from "@shared/ApplicationException";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";

export class MaintenanceProjection extends AbstractProjection {
    constructor(private _maintenanceRepository: any) {
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

    async applyUpdateEvent(event: RegisterGarageEvent): Promise<VoidResult> {
        const maintenance = await this._maintenanceRepository.find(event.payload.siret)
        if (!maintenance.success) return Result.FailureStr("Cannot delete maintenances")

        const updatedMaintenance = Maintenance.fromObject({
            ...maintenance,
            ...event.payload
        })
        if (updatedMaintenance instanceof Error) return Result.FailureStr("Cannot update maintenances")
        return this._maintenanceRepository.store(updatedMaintenance);
    }
}