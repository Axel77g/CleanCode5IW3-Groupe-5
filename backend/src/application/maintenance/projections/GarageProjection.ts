import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Garage } from "@domain/maintenance/entities/Garage";
import { RegisterGarageEvent } from "@domain/maintenance/events/garage/RegisterGarageEvent";
import { UnregisterGarageEvent } from "@domain/maintenance/events/garage/UnregisterGarageEvent";
import { UpdateGarageEvent } from "@domain/maintenance/events/garage/UpdateGarageEvent";
import { Result, VoidResult } from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";
import {Siret} from "@domain/shared/value-object/Siret";

export class GarageProjection extends AbstractProjection {
    constructor(private _garageRepository: GarageRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler): void {
        projectionJobScheduler.schedule(RegisterGarageEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterGarageEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateGarageEvent.type, this.constructor.name)
    }

    bindEvents(): { [key: string]: (event: any) => Promise<VoidResult>; } {
        return {
            [RegisterGarageEvent.type]: this.applyRegisterEvent,
            [UnregisterGarageEvent.type] : this.applyUnregisterEvent,
            [UpdateGarageEvent.type] : this.applyUpdateEvent
        }
    }

    async applyRegisterEvent(event: RegisterGarageEvent): Promise<VoidResult> {
        const garage = Garage.fromObject(event.payload)
        if (garage instanceof ApplicationException) return Result.Failure(garage)
        return this._garageRepository.store(garage)
    }

    async applyUnregisterEvent(event: UnregisterGarageEvent): Promise<VoidResult> {
        const siret=  Siret.create(event.payload.siret)
        if (siret instanceof ApplicationException) return Result.Failure(siret)
        const response = await this._garageRepository.getBySiret(siret)
        if (!response.success) return Result.FailureStr("Cannot delete garages")
        if(response.empty) return Result.FailureStr("Garage not found, should not happen")
        return this._garageRepository.deleteGarage(siret)
    }

    async applyUpdateEvent(event: UpdateGarageEvent): Promise<VoidResult> {
        const siret=  Siret.create(event.payload.siret)
        if (siret instanceof ApplicationException) return Result.Failure(siret)
        const garage = await this._garageRepository.getBySiret(siret)
        if (!garage.success) return Result.FailureStr("Cannot delete garages")
        if(garage.empty) return Result.FailureStr("Garage not found, should not happen")
        const updatedGarage = garage.value?.update({
            name: event.payload.name,
            phoneNumber: event.payload.phoneNumber
        })
        if (updatedGarage instanceof Error) return Result.FailureStr("Cannot update garages")
        return this._garageRepository.store(updatedGarage);
    }
}