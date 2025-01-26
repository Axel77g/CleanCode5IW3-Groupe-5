import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {
    createShowDealerStockUseCase,
    ShowDealerStockUseCase
} from "@application/inventoryManagement/usecases/stock/ShowDealerStockUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";

export const showDealerStockUseCase : UseCaseImplementation<typeof siretRequest, ShowDealerStockUseCase> = async (input) =>{
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createShowDealerStockUseCase(stockRepository)
    return useCase({
        siret
    })
}