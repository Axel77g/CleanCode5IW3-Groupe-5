import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {
    createShowOrderHistoryUseCase,
    ShowOrderHistoryUseCase
} from "@application/inventoryManagement/usecases/order/ShowOrderHistoryUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {orderRepository} from "@infrastructureCore/repositories/inventoryManagement/orderRepository";

export const showOrderHistoryUseCase : UseCaseImplementation<typeof siretRequest, ShowOrderHistoryUseCase> = async (input) =>{
    const siret = Siret.create(input.siret)
    if(siret instanceof Error) return Result.Failure(siret)
    const _showDealerUseCase = createShowDealerUseCase(dealerRepository)
    const useCase = createShowOrderHistoryUseCase(_showDealerUseCase, orderRepository)
    return useCase({siret})
}