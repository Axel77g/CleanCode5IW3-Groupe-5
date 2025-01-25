import { Address } from "@domain/shared/value-object/Address";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {Dealer} from "@domain/inventoryManagement/entities/Dealer";

interface RegisterDealerInput extends IInputUseCase {
    siret: Siret,
    name: string,
    address: Address,
    phoneNumber: string
}

export type RegisterDealerUseCase = IUseCase<RegisterDealerInput, Result>
export const createRegisterDealerUseCase = (_eventRepository : EventRepository, _dealerRepository : DealerRepository) : RegisterDealerUseCase => {
    return async (input: RegisterDealerInput) => {
        const existingDealerResponse = await _dealerRepository.getBySiret(input.siret);
        if(!existingDealerResponse.success) return existingDealerResponse
        if(!existingDealerResponse.empty) return Result.FailureStr("Dealer already exists with this siret")
        const dealer = Dealer.create(input)
        const storeResponse = await _eventRepository.storeEvent(dealer.registerEvent());
        if (!storeResponse.success) return Result.FailureStr("Cannot register dealer")
        return Result.Success("Dealer registered")
    }
}