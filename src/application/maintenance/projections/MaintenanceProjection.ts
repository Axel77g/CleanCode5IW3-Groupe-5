import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {Result, VoidResult} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {ApplicationException} from "@shared/ApplicationException";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {UnregisterGarageEvent} from "@domain/maintenance/events/garage/UnregisterGarageEvent";

export class MaintenanceProjection extends AbstractProjection {
    constructor(private _maintenanceRepository: MaintenanceRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler): void {
        projectionJobScheduler.schedule(RegisterMaintenanceEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateMaintenanceEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterGarageEvent.type, this.constructor.name)
    }

    bindEvents(): { [key: string]: (event: any) => Promise<VoidResult>; } {
        return {
            [RegisterMaintenanceEvent.type]: this.applyRegisterEvent,
            [UpdateMaintenanceEvent.type]: this.applyUpdateEvent,
            [UnregisterGarageEvent.type]: this.applyUnregisterGarageEvent
        }
    }

    async applyRegisterEvent(event: RegisterMaintenanceEvent): Promise<VoidResult> {
        const maintenance = Maintenance.fromObject(event.payload)
        if (maintenance instanceof ApplicationException) return Result.Failure(maintenance)
        return this._maintenanceRepository.store(maintenance)
    }

    async applyUpdateEvent(event: UpdateMaintenanceEvent): Promise<VoidResult> {
        const maintenance = await this._maintenanceRepository.getByMaintenanceId(event.payload.maintenanceId)
        if (!maintenance.success) return Result.FailureStr("Cannot update maintenances")
        if(maintenance.empty) return Result.FailureStr("Maintenance not found, this should not happen")
        const siret = event.payload.garageSiret ? Siret.create(event.payload.garageSiret) : null
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        const updatedMaintenance = maintenance.value.update({
            ...event.payload,
            garageSiret: siret
        })
        if (updatedMaintenance instanceof ApplicationException) return Result.FailureStr("Cannot update maintenances")
        return this._maintenanceRepository.store(updatedMaintenance);
    }

    async applyUnregisterGarageEvent(event: UnregisterGarageEvent): Promise<VoidResult> {
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        const maintenance = await this._maintenanceRepository.listGarageMaintenances<false>(siret)
        if (!maintenance.success) return Result.FailureStr("Cannot delete maintenances")
        if(maintenance.empty) return Result.FailureStr("Maintenance not found, this should not happen")
        const jobs = maintenance.value.map(async (maintenance) =>{
            const updateMaintenance = maintenance.update({
                garageSiret: null,
                status: maintenance.status,
                maintenanceSpareParts: maintenance.maintenanceSpareParts,
                recommendation: maintenance.recommendation,
            })
            if(updateMaintenance instanceof ApplicationException) return Result.Failure(updateMaintenance)
            return this._maintenanceRepository.store(updateMaintenance)
        })
        const results = await Promise.all(jobs)
        if(results.some(result => !result.success)) return Result.FailureStr("Cannot update maintenances")
        return Result.SuccessVoid()
    }
}