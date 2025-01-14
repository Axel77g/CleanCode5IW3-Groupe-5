import { RegisterDealerEvent } from "@domain/inventoryManagement/events/RegisterDealerEvent";
import { Address } from "@domain/shared/value-object/Address";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { EventRepository } from "../../../shared/repositories/EventRepository";

interface RegisterDealerInput extends IInputUseCase {
    siret: Siret,
    name: string,
    address: Address,
    phoneNumber: string
}

export type RegisterDealerUseCase = IUseCase<RegisterDealerInput, Result>
export const createRegisterDealerUseCase = (_eventRepository : EventRepository) : RegisterDealerUseCase => {
    return async (input: RegisterDealerInput) => {
        const registerDealerEvent = new RegisterDealerEvent({
            siret: input.siret.getValue(),
            name: input.name,
            address: input.address,
            phoneNumber: input.phoneNumber
        })
        const storeResponse = await _eventRepository.storeEvent(registerDealerEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot register dealer")
        return Result.Success("Dealer registered")
    }
}