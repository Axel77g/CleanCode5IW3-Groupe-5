import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";

interface UnregisterGarageInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterGarageUseCase = IUseCase<UnregisterGarageInput, Result>

const unregisterGarageErrors = {
    NOT_FOUND_GARAGE: "Cannot unregister garages not found"
}

export const createUnregisterGarageUseCase = (_eventRepository: EventRepository, _garageRepository: GarageRepository): UnregisterGarageUseCase => {
    return async (input: UnregisterGarageInput) => {
        const garage = await _garageRepository.getBySiret(input.siret);
        if (!garage.success) return garage;
        if (garage.empty) return Result.FailureStr(unregisterGarageErrors.NOT_FOUND_GARAGE);
        const deleteResponse = await _eventRepository.storeEvent(garage.value.unregisterEvent());
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister garages");
        return Result.Success('"Garage unregistered"');
    }
}