import { EventRepository } from "@application/shared/repositories/EventRepository";
import { UnregisterVehiculeEvent } from "@domain/maintenance/events/vehicule/UnregisterVehiculeEvent";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UnregisterVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
}

export type UnregisterVehiculeUseCase = IUseCase<UnregisterVehiculeInput, Result>
export const createUnregisterUseCase = (_eventRepository: EventRepository): UnregisterVehiculeUseCase => {
    return async (input: UnregisterVehiculeInput) => {
        const unregisterVehiculeEvent = new UnregisterVehiculeEvent({
            immatriculation: input.immatriculation.getValue()
        })
        const deleteResponse = await _eventRepository.storeEvent(unregisterVehiculeEvent)
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister vehicule")
        return Result.Success("Vehicule unregistered")
    }
}