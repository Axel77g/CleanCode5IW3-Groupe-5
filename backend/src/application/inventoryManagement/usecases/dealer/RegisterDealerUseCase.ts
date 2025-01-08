import { Dealer } from "../../../../domain/inventoryManagement/entities/Dealer";
import { DealerAddress } from "../../../../domain/maintenance/value-object/DealerAddress";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";

interface RegisterDealerInput extends IInputUseCase {
    siret: Siret,
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
        if (!storeResponse.success) return Result.FailureStr("Cannot register dealer")
        return Result.Success("Dealer registered")
    }
}