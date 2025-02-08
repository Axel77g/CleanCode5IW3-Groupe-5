import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterVehiculeBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehiculeBreakDownEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {Result, VoidResult} from "@shared/Result";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";

export class VehiculeBreakdownProjection extends AbstractProjection {
    constructor (private _vehiculeBreakdownRepository: VehiculeBreakdownRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterVehiculeBreakDownEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(AssignBreakdownToMaintenanceEvent.type, this.constructor.name)
    }

    bindEvents () {
        return {
            [RegisterVehiculeBreakDownEvent.type]: this.applyRegisterVehiculeBreakDownEvent,
            [AssignBreakdownToMaintenanceEvent.type]: this.applyAssignBreakdownToMaintenanceEvent
        }
    }

    async applyRegisterVehiculeBreakDownEvent(event: RegisterVehiculeBreakDownEvent): Promise<VoidResult> {
        const vehiculeBreakdown = VehiculeBreakdown.fromObject(event.payload)
        if (vehiculeBreakdown instanceof ApplicationException) return Result.Failure(vehiculeBreakdown)
        return this._vehiculeBreakdownRepository.store(vehiculeBreakdown)
    }

    async applyAssignBreakdownToMaintenanceEvent(event: AssignBreakdownToMaintenanceEvent): Promise<VoidResult> {
        const vehiculeBreakdown = await this._vehiculeBreakdownRepository.getBreakdownById(event.payload.vehiculeBreakDownId)
        if (!vehiculeBreakdown.success) return vehiculeBreakdown
        if (vehiculeBreakdown.empty) return Result.FailureStr("Vehicule breakdown not found, should not happen")
        const updatedVehiculeBreakdown = vehiculeBreakdown.value.assignToMaintenance(event.payload.maintenanceId)
        if (updatedVehiculeBreakdown instanceof ApplicationException) return Result.Failure(updatedVehiculeBreakdown)
        return this._vehiculeBreakdownRepository.store(updatedVehiculeBreakdown)
    }
}