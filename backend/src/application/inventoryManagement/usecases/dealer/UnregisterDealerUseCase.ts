import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerRepository} from "../../repositories/DealerRepository";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Result} from "../../../../shared/Result";

interface UnregisterDealerInput extends IInputUseCase{
    dealerSiret: DealerSiret
}

export type UnregisterDealerUseCase = IUseCase<UnregisterDealerInput, Result>
export const unregisterDealerUseCase = (_dealerRepository: DealerRepository): UnregisterDealerUseCase => {
    return async (input: UnregisterDealerInput) => {
        const deleteResponse = await _dealerRepository.delete(input.dealerSiret)
        if(!deleteResponse.success) return Result.FailureStr("Cannot unregister dealer")
        return Result.Success("Dealer unregistered")
    }
}
