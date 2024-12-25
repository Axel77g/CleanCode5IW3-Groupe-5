import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerRepository} from "../../repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {DealerAddress} from "../../../../domain/inventoryManagement/value-object/DealerAddress";
import {Result} from "../../../../shared/Result";

interface RegisterDealerInput extends IInputUseCase{
    siret: DealerSiret,
    name: string,
    address: DealerAddress,
    phoneNumber: string
}

export type RegisterDealerUseCase = IUseCase<RegisterDealerInput, Result>
export const registerOrderUseCase = (_dealerRepository: DealerRepository): RegisterDealerUseCase => {
    return async (input: RegisterDealerInput) => {
        const dealer = new Dealer(
            input.siret,
            input.name,
            input.address,
            input.phoneNumber
        );
        const storeResponse = await _dealerRepository.store(dealer);
        if(!storeResponse.success) return Result.FailureStr("Cannot register dealer")
        return Result.Success("Dealer registered")
    }
}