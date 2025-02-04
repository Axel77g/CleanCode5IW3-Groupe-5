import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { RegisterVehiculeEvent } from "@domain/maintenance/events/vehicule/RegisterVehiculeEvent";
import { UnregisterVehiculeEvent } from "@domain/maintenance/events/vehicule/UnregisterVehiculeEvent";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { Result, VoidResult } from "@shared/Result";
import { VehiculeRepository } from '../repositories/VehiculeRepository';
import {UpdateVehiculeEvent} from "@domain/maintenance/events/vehicule/UpdateVehiculeEvent";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";

export class VehiculeProjection extends AbstractProjection {
    constructor(private _vehiculeRepository: VehiculeRepository) {
        super();
    }

    init(projectionJobScheduler: any) {
        projectionJobScheduler.schedule(RegisterVehiculeEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterVehiculeEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterVehiculeEvent.type]: this.applyRegisterEvent,
            [UnregisterVehiculeEvent.type]: this.applyUnregisteredEvent,
            [UpdateVehiculeEvent.type]: this.applyUpdateEvent,
        }
    }

    async applyRegisterEvent(event: RegisterVehiculeEvent): Promise<VoidResult> {
        const vehicule = Vehicule.fromObject(event.payload)
        if (vehicule instanceof Error) return Result.FailureStr("Cannot register vehicules");
        return this._vehiculeRepository.store(vehicule)
    }

    async applyUnregisteredEvent(event: UnregisterVehiculeEvent): Promise<VoidResult> {
        const immatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof Error) return Result.FailureStr("Cannot update vehicules")
        const vehicule = await this._vehiculeRepository.getByImmatriculation(immatriculation)
        if (!vehicule.success) return Result.FailureStr("Cannot delete vehicules")
        return this._vehiculeRepository.delete(immatriculation)
    }

    async applyUpdateEvent(event: UpdateVehiculeEvent): Promise<VoidResult> {
        const immatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof Error) return Result.FailureStr("Cannot update vehicules")
        const vehicule = await this._vehiculeRepository.getByImmatriculation(immatriculation)
        if (!vehicule.success) return Result.FailureStr("Cannot update vehicules")
        vehicule.value.update(event.payload)
        return this._vehiculeRepository.store(vehicule.value)
    }
}