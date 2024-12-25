import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {Dealer} from "../../../../domain/inventoryManagement/entities/Dealer";
import {DealerRepository} from "../../repositories/DealerRepository";
import {Result} from "../../../../shared/Result";

interface ShowDealerInput extends IInputUseCase{
    dealerSiret: DealerSiret
}

type ShowDealerResult = Result<Dealer>
export type ShowDealerUseCase = IUseCase<ShowDealerInput, ShowDealerResult>
export const showDealerUseCase = (_dealerRepository: DealerRepository): ShowDealerUseCase => {
    return async (input: ShowDealerInput) => {
        const findResponse = await _dealerRepository.getBySiret(input.dealerSiret)
        if(!findResponse.success) return Result.FailureStr("Dealer not found")
        return findResponse
    }
}
