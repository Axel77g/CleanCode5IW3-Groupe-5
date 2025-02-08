import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { Vehicle } from "@domain/maintenance/entities/Vehicle";
import { RegisterVehicleEvent } from "@domain/maintenance/events/vehicle/RegisterVehicleEvent";
import { UnregisterVehicleEvent } from "@domain/maintenance/events/vehicle/UnregisterVehicleEvent";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { Result, VoidResult } from "@shared/Result";
import { VehicleRepository } from '../repositories/VehicleRepository';
import {UpdateVehicleEvent} from "@domain/maintenance/events/vehicle/UpdateVehicleEvent";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
import {ApplicationException} from "@shared/ApplicationException";
import {Period} from "@domain/testDrive/value-object/Period";

export class VehicleProjection extends AbstractProjection {
    constructor(private _vehicleRepository: VehicleRepository) {
        super();
    }

    init(projectionJobScheduler: any) {
        projectionJobScheduler.schedule(RegisterVehicleEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterVehicleEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateVehicleEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterVehicleEvent.type]: this.applyRegisterEvent,
            [UnregisterVehicleEvent.type]: this.applyUnregisteredEvent,
            [UpdateVehicleEvent.type]: this.applyUpdateEvent,
        }
    }

    async applyRegisterEvent(event: RegisterVehicleEvent): Promise<VoidResult> {
        const vehicle = Vehicle.fromObject(event.payload)
        if (vehicle instanceof ApplicationException) return Result.FailureStr("Cannot register vehicles");
        return this._vehicleRepository.store(vehicle)
    }

    async applyUnregisteredEvent(event: UnregisterVehicleEvent): Promise<VoidResult> {
        const immatriculation = VehicleImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof ApplicationException) return Result.FailureStr("Cannot update vehicles")
        const vehicle = await this._vehicleRepository.getByImmatriculation(immatriculation)
        if (!vehicle.success) return Result.FailureStr("Cannot delete vehicles")
        return this._vehicleRepository.delete(immatriculation)
    }

    async applyUpdateEvent(event: UpdateVehicleEvent): Promise<VoidResult> {
        const immatriculation = VehicleImmatriculation.create(event.payload.immatriculation)
        if (immatriculation instanceof ApplicationException) return Result.FailureStr("Cannot update vehicles")
        const maintenanceInterval = VehicleMaintenanceInterval.create(event.payload.maintenanceInterval.duration, event.payload.maintenanceInterval.mileage, event.payload.maintenanceInterval.lastMaintenance)
        if (maintenanceInterval instanceof ApplicationException) return Result.FailureStr("Cannot update vehicle, maintenances interval is not valid")
        const warranty = Period.create(event.payload.warranty.periodStart, event.payload.warranty.periodEnd)
        if (warranty instanceof ApplicationException) return Result.FailureStr("Cannot update vehicle, warranty is not valid")
        const vehicle = await this._vehicleRepository.getByImmatriculation(immatriculation)
        if (!vehicle.success) return Result.FailureStr("Cannot update vehicles")
        if(vehicle.empty) return Result.FailureStr("Vehicle not found, it should not happen")

        const updatedVehicle = vehicle.value.update({
            mileage: event.payload.mileage,
            maintenanceInterval,
            status: event.payload.status,
            warranty,
        })

        if (updatedVehicle instanceof ApplicationException) return Result.FailureStr("Cannot update vehicles")
        return this._vehicleRepository.store(updatedVehicle)
    }
}