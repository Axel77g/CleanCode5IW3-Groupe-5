import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { RegisterVehiculeEvent } from "@domain/maintenance/events/vehicule/RegisterVehiculeEvent";
import { UnregisterVehiculeEvent } from "@domain/maintenance/events/vehicule/UnregisterVehiculeEvent";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { Result, VoidResult } from "@shared/Result";
import { VehiculeRepository } from '../repositories/VehiculeRepository';
import {UpdateVehiculeEvent} from "@domain/maintenance/events/vehicule/UpdateVehiculeEvent";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {ApplicationException} from "@shared/ApplicationException";
import {Period} from "@domain/testDrive/value-object/Period";
import {AssignVehiculeToCustomerEvent} from "@domain/maintenance/events/vehicule/AssignVehiculeToCustomerEvent";

export class VehiculeProjection extends AbstractProjection {
    constructor(private _vehiculeRepository: VehiculeRepository) {
        super();
    }

    init(projectionJobScheduler: any) {
        projectionJobScheduler.schedule(RegisterVehiculeEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterVehiculeEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateVehiculeEvent.type, this.constructor.name)
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
        if (vehicule instanceof ApplicationException) return Result.FailureStr("Cannot register vehicules");
        return this._vehiculeRepository.store(vehicule)
    }

    async applyUnregisteredEvent(event: UnregisterVehiculeEvent): Promise<VoidResult> {
        const immatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof ApplicationException) return Result.FailureStr("Cannot update vehicules")
        const vehicule = await this._vehiculeRepository.getByImmatriculation(immatriculation)
        if (!vehicule.success) return Result.FailureStr("Cannot delete vehicules")
        return this._vehiculeRepository.delete(immatriculation)
    }

    async applyUpdateEvent(event: UpdateVehiculeEvent): Promise<VoidResult> {
        const immatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof ApplicationException) return Result.FailureStr("Cannot update vehicles")
        const maintenanceInterval = VehiculeMaintenanceInterval.create(event.payload.maintenanceInterval.duration, event.payload.maintenanceInterval.mileage, event.payload.maintenanceInterval.lastMaintenance)
        if (maintenanceInterval instanceof ApplicationException) return Result.FailureStr("Cannot update vehicule, maintenances interval is not valid")
        const warranty = Period.create(event.payload.warranty.periodStart, event.payload.warranty.periodEnd)
        if (warranty instanceof ApplicationException) return Result.FailureStr("Cannot update vehicule, warranty is not valid")
        const vehicule = await this._vehiculeRepository.getByImmatriculation(immatriculation)
        if (!vehicule.success) return Result.FailureStr("Cannot update vehicules")
        if(vehicule.empty) return Result.FailureStr("Vehicule not found, it should not happen")

        const updatedVehicule = vehicule.value.update({
            mileage: event.payload.mileage,
            maintenanceInterval,
            status: event.payload.status,
            warranty,
        })

        if (updatedVehicule instanceof ApplicationException) return Result.FailureStr("Cannot update vehicules")
        return this._vehiculeRepository.store(updatedVehicule)
    }

    // async applyAssignVehiculeToCustomerEvent(event: AssignVehiculeToCustomerEvent): Promise<VoidResult> {
    //     const immatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
    //     if (immatriculation instanceof ApplicationException) return Result.FailureStr("Cannot assign vehicules")
    //     const vehicule = await this._vehiculeRepository.getByImmatriculation(immatriculation)
    //     if (!vehicule.success) return Result.FailureStr("Cannot assign vehicules")
    //     if (vehicule.empty) return Result.FailureStr("Vehicule not found")
    //     const customer = await this._customerRepositor.getCustomerById(event.payload.customerId)
    // }
}