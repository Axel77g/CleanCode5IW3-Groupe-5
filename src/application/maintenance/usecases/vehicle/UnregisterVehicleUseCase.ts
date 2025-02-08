import { VehicleRepository } from '@application/maintenance/repositories/VehicleRepository';
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { NotFoundEntityException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UnregisterVehicleInput extends IInputUseCase {
    immatriculation: VehicleImmatriculation;
}

export type UnregisterVehicleUseCase = IUseCase<UnregisterVehicleInput, Result>

const unregisteredVehicleErrors = {
    Vehicle_NOT_FOUND: NotFoundEntityException.create("Cannot unregister vehicles not found")
}

export const createUnregisterVehicleUseCase = (_eventRepository: EventRepository, _vehicleRepository: VehicleRepository): UnregisterVehicleUseCase => {
    return async (input: UnregisterVehicleInput) => {
        const vehicle = await _vehicleRepository.getByImmatriculation(input.immatriculation);
        if (!vehicle.success) return vehicle
        if (vehicle.empty) return Result.Failure(unregisteredVehicleErrors.Vehicle_NOT_FOUND)
        const deleteResponse = await _eventRepository.storeEvent(vehicle.value.unregisterEvent())
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister vehicles")
        return Result.Success("Vehicle unregistered")
    }
}