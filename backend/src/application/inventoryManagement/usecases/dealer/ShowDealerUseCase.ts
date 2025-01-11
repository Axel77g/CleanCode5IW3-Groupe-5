import { Dealer } from "@domain/inventoryManagement/entities/Dealer";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";

interface ShowDealerInput extends IInputUseCase {
    siret: Siret
}

type ShowDealerResult = Result<Dealer>
export type ShowDealerUseCase = IUseCase<ShowDealerInput, ShowDealerResult>
export const showDealerUseCase = (_dealerRepository: DealerRepository): ShowDealerUseCase => {
    return async (input: ShowDealerInput) => {
        const findResponse = await _dealerRepository.getBySiret(input.siret);
        if (!findResponse.success) return Result.FailureStr("Dealer not found")
        return findResponse
    }
}
