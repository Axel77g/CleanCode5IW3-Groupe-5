import { Siret } from "@domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";
import {EventRepository} from "../../../shared/repositories/EventRepository";

interface UnregisterDealerInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterDealerUseCase = IUseCase<UnregisterDealerInput, Result>
export const unregisterDealerUseCase = (_eventRepository : EventRepository): UnregisterDealerUseCase => {
    return async (input: UnregisterDealerInput) => {
        const unregisterDealerEvent = new UnregisterDealerEvent({
            siret: input.siret.getValue()
        })
        const deleteResponse = await _eventRepository.storeEvent(unregisterDealerEvent)
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister dealer")
        return Result.Success("Dealer unregistered")
    }
}
