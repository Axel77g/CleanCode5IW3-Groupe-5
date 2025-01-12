import { RegisterDealerEvent } from "@domain/inventoryManagement/events/RegisterDealerEvent";
import { DealerAddress } from "@domain/shared/value-object/DealerAddress";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { EventRepository } from "../../../shared/repositories/EventRepository";

interface RegisterDealerInput extends IInputUseCase {
    siret: Siret,
    name: string,
    address: DealerAddress,
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