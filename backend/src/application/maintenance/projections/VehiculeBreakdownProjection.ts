import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {RegisterVehiculeBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehiculeBreakDownEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {Result, VoidResult} from "@shared/Result";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";

export class VehiculeBreakdownProjection extends AbstractProjection {
    constructor (private _vehiculeBreakdownRepository: VehiculeBreakdownRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterVehiculeBreakDownEvent.type, this.constructor.name)

    }

    bindEvents () {
        return {
            [RegisterVehiculeBreakDownEvent.type]: this.applyRegisterVehiculeBreakDownEvent,
        }
    }

    async applyRegisterVehiculeBreakDownEvent(event: RegisterVehiculeBreakDownEvent): Promise<VoidResult> {
        const vehiculeBreakdown = VehiculeBreakdown.fromObject(event.payload)
        if (vehiculeBreakdown instanceof ApplicationException) return Result.Failure(vehiculeBreakdown)
        return this._vehiculeBreakdownRepository.store(vehiculeBreakdown)
    }
}