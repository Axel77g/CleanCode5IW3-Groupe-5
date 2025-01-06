import { Siret } from "../../../../domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";

interface UnregisterDealerInput extends IInputUseCase {
    siret: Siret,
}

export type UnregisterDealerUseCase = IUseCase<UnregisterDealerInput, Result>
export const unregisterDealerUseCase = (_dealerRepository: DealerRepository): UnregisterDealerUseCase => {
    return async (input: UnregisterDealerInput) => {
        const deleteResponse = await _dealerRepository.delete(input.siret)
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister dealer")
        return Result.Success("Dealer unregistered")
    }
}
