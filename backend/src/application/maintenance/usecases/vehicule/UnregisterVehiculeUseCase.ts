import { VehiculeRepository } from '@application/maintenance/repositories/VehiculeRepository';
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { NotFoundEntityException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UnregisterVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
}

export type UnregisterVehiculeUseCase = IUseCase<UnregisterVehiculeInput, Result>

const unregisteredVehicleErrors = {
    VEHICULE_NOT_FOUND: NotFoundEntityException.create("Cannot unregister vehicules not found")
}

export const createUnregisterVehiculeUseCase = (_eventRepository: EventRepository, _vehiculeRepository: VehiculeRepository): UnregisterVehiculeUseCase => {
    return async (input: UnregisterVehiculeInput) => {
        const vehicule = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!vehicule.success) return vehicule
        if (vehicule.empty) return Result.Failure(unregisteredVehicleErrors.VEHICULE_NOT_FOUND)
        const deleteResponse = await _eventRepository.storeEvent(vehicule.value.unregisterEvent())
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister vehicules")
        return Result.Success("Vehicule unregistered")
    }
}