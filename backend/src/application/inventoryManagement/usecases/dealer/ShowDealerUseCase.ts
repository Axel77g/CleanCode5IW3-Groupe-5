import { Dealer } from "@domain/inventoryManagement/entities/Dealer";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { DealerRepository } from "../../repositories/DealerRepository";
import {NotFoundEntityException} from "@shared/ApplicationException";

interface ShowDealerInput extends IInputUseCase {
    siret: Siret
}

type ShowDealerResult = Result<Dealer>
export type ShowDealerUseCase = IUseCase<ShowDealerInput, ShowDealerResult>
export const createShowDealerUseCase = (_dealerRepository: DealerRepository): ShowDealerUseCase => {
    return async (input: ShowDealerInput) => {
        const findResponse = await _dealerRepository.getBySiret(input.siret);
        if(!findResponse.success) return findResponse
        if(findResponse.value === null) return Result.Failure(NotFoundEntityException.create("Dealer not found"))
        return findResponse
    }
}
