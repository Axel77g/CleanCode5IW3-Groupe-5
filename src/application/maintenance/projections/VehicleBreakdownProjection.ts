import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterVehicleBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehicleBreakDownEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {Result, VoidResult} from "@shared/Result";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";

export class VehicleBreakdownProjection extends AbstractProjection {
    constructor (private _vehicleBreakdownRepository: VehicleBreakdownRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterVehicleBreakDownEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(AssignBreakdownToMaintenanceEvent.type, this.constructor.name)
    }

    bindEvents () {
        return {
            [RegisterVehicleBreakDownEvent.type]: this.applyRegisterVehicleBreakDownEvent,
            [AssignBreakdownToMaintenanceEvent.type]: this.applyAssignBreakdownToMaintenanceEvent
        }
    }

    async applyRegisterVehicleBreakDownEvent(event: RegisterVehicleBreakDownEvent): Promise<VoidResult> {
        const vehicleBreakdown = VehicleBreakdown.fromObject(event.payload)
        if (vehicleBreakdown instanceof ApplicationException) return Result.Failure(vehicleBreakdown)
        return this._vehicleBreakdownRepository.store(vehicleBreakdown)
    }

    async applyAssignBreakdownToMaintenanceEvent(event: AssignBreakdownToMaintenanceEvent): Promise<VoidResult> {
        const vehicleBreakdown = await this._vehicleBreakdownRepository.getBreakdownById(event.payload.vehicleBreakDownId)
        if (!vehicleBreakdown.success) return vehicleBreakdown
        if (vehicleBreakdown.empty) return Result.FailureStr("Vehicle breakdown not found, should not happen")
        const updatedVehicleBreakdown = vehicleBreakdown.value.assignToMaintenance(event.payload.maintenanceId)
        if (updatedVehicleBreakdown instanceof ApplicationException) return Result.Failure(updatedVehicleBreakdown)
        return this._vehicleBreakdownRepository.store(updatedVehicleBreakdown)
    }
}