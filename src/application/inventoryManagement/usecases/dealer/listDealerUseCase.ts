import { Dealer } from "@domain/inventoryManagement/entities/Dealer";
import { IUseCase } from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";


type ListDealerResult = PaginatedResult<Dealer>
export type ListDealerUseCase = IUseCase<PaginatedInput, ListDealerResult>
export const createListDealerUseCase = (_dealerRepository: DealerRepository): ListDealerUseCase => {
    return async (input: PaginatedInput) => {
        const findResponse = await _dealerRepository.list(input);
        if (!findResponse.success) return Result.FailureStr("Cannot list dealers")
        return findResponse
    }
}
