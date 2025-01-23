import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Garage } from "@domain/maintenance/entities/Garage";
import { RegisterGarageEvent } from "@domain/maintenance/events/garage/RegisterGarageEvent";
import { UnregisterGarageEvent } from "@domain/maintenance/events/garage/UnregisterGarageEvent";
import { UpdateGarageEvent } from "@domain/maintenance/events/garage/UpdateGarageEvent";
import { Result, VoidResult } from "@shared/Result";

export class GarageProjection extends AbstractProjection {
    constructor(private _garageRepository: any) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler): void {
        projectionJobScheduler.schedule(RegisterGarageEvent.type, this.constructor.name)
    }

    bindEvents(): { [key: string]: (event: any) => Promise<VoidResult>; } {
        return {
            [RegisterGarageEvent.type]: this.applyRegisterEvent
        }
    }

    async applyRegisterEvent(event: RegisterGarageEvent): Promise<VoidResult> {
        const garage = Garage.fromObject(event.payload)
        if (garage instanceof Error) return Result.Failure(garage)
        return this._garageRepository.store(garage)
    }

    async applyUnregisterEvent(event: UnregisterGarageEvent): Promise<VoidResult> {
        const response = await this._garageRepository.find(event.payload.siret)
        if (!response.success) return Result.FailureStr("Cannot delete garage")
        return this._garageRepository.delete(event.payload.siret)
    }

    async applyUpdateEvent(event: UpdateGarageEvent): Promise<VoidResult> {
        const garage = await this._garageRepository.find(event.payload.siret)
        if (!garage.success) return Result.FailureStr("Cannot delete garage")

        const updatedGarage = Garage.fromObject({
            ...garage,
            ...event.payload
        })
        if (updatedGarage instanceof Error) return Result.FailureStr("Cannot update garage")
        return this._garageRepository.store(updatedGarage);
    }
}