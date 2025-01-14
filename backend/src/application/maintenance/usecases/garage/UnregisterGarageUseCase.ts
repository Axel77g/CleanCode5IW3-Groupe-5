import { EventRepository } from "@application/shared/repositories/EventRepository";
import { UnregisterGarageEvent } from "@domain/maintenance/events/UnregisterGarageEvent";
import { Siret } from "../../../../domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";

interface DeleteGarageInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterGarageUseCase = IUseCase<DeleteGarageInput, Result>
export const createUnregisterGarageUseCase = (_eventRepository: EventRepository): UnregisterGarageUseCase => {
    return async (input: DeleteGarageInput) => {
        const unregisterGarageEvent = new UnregisterGarageEvent({
            siret: input.siret.getValue()
        });
        const deleteResponse = await _eventRepository.storeEvent(unregisterGarageEvent);
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister garage");
        return Result.Success('"Garage unregistered"');
    }
}