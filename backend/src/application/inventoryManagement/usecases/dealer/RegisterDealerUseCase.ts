import { Dealer } from "../../../../domain/inventoryManagement/entities/Dealer";
import { DealerAddress } from "../../../../domain/inventoryManagement/value-object/DealerAddress";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {RegisterDealerEvent} from "../../../../domain/inventoryManagement/events/RegisterDealerEvent";

interface RegisterDealerInput extends IInputUseCase {
    siret: Siret,
    name: string,
    address: DealerAddress,
    phoneNumber: string
}

export type RegisterDealerUseCase = IUseCase<RegisterDealerInput, Result>
export const registerOrderUseCase = (_eventRepository : EventRepository) : RegisterDealerUseCase => {
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