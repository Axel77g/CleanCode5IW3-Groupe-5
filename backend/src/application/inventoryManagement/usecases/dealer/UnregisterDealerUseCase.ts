import { Siret } from "@domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";
import {NotFoundEntityException} from "@shared/ApplicationException";

interface UnregisterDealerInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterDealerUseCase = IUseCase<UnregisterDealerInput, Result>

const unregisterDealerErrors = {
    NOT_FOUND_DEALER: NotFoundEntityException.create("Cannot unregister dealer not found")
}

export const createUnregisterDealerUseCase = (_eventRepository : EventRepository, _dealerRepository: DealerRepository): UnregisterDealerUseCase => {
    return async (input: UnregisterDealerInput) => {
        const dealer = await _dealerRepository.getBySiret(input.siret);
        if(!dealer.success) return dealer
        if(dealer.value === null) return Result.Failure(unregisterDealerErrors.NOT_FOUND_DEALER)
        const unregisterDealerEvent = new UnregisterDealerEvent({
            siret: input.siret.getValue()
        })
        const deleteResponse = await _eventRepository.storeEvent(unregisterDealerEvent)
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister dealer")
        return Result.Success("Dealer unregistered")
    }
}
