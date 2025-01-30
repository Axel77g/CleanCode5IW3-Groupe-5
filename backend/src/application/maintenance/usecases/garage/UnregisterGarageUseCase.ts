import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { Siret } from "../../../../domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";

interface UnregisterGarageInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterGarageUseCase = IUseCase<UnregisterGarageInput, Result>

const unregisterGarageErrors = {
    NOT_FOUND_GARAGE: "Cannot unregister garage not found"
}

export const createUnregisterGarageUseCase = (_eventRepository: EventRepository, _garageReposiotory: GarageRepository): UnregisterGarageUseCase => {
    return async (input: UnregisterGarageInput) => {
        const garage = await _garageReposiotory.getBySiret(input.siret);
        if (!garage.success) return garage;
        if (garage.empty) return Result.FailureStr(unregisterGarageErrors.NOT_FOUND_GARAGE);
        const deleteResponse = await _eventRepository.storeEvent(garage.value.unregisterEvent());
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister garage");
        return Result.Success('"Garage unregistered"');
    }
}