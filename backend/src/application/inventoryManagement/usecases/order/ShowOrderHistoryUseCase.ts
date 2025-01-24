import { Order } from "@domain/inventoryManagement/entities/Order";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {ShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";

interface ShowOrderHistoryInput extends IInputUseCase {
    siret: Siret
}
type ShowOrderHistoryResult = Result<Order[]>
export type ShowOrderHistoryUseCase = IUseCase<ShowOrderHistoryInput, ShowOrderHistoryResult>
export const createShowOrderHistoryUseCase = (_showDealerUseCase: ShowDealerUseCase, _orderRepository: OrderRepository): ShowOrderHistoryUseCase => {
    return async (input: ShowOrderHistoryInput) => {
        const dealerResponse = await _showDealerUseCase({ siret: input.siret })
        if (!dealerResponse.success) return dealerResponse
        if(dealerResponse.empty) return Result.FailureStr("Dealer not found")
        const findResponse = await _orderRepository.findOrdersByDealer(dealerResponse.value.siret)
        if (!findResponse.success) return findResponse
        return findResponse
    }
}