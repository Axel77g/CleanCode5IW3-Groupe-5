import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {ShowDealerUseCase} from "../dealer/ShowDealerUseCase";
import {Order} from "../../../../domain/inventoryManagement/entities/Order";
import {OrderRepository} from "../../repositories/OrderRepository";
import {Result} from "../../../../shared/Result";

interface ShowOrderHistoryInput extends IInputUseCase{
    dealerSiret: DealerSiret
}
type ShowOrderHistoryResult = Result<Order[]>
export type ShowOrderHistoryUseCase = IUseCase<ShowOrderHistoryInput, ShowOrderHistoryResult>
export const showOrderHistoryUseCase = (_showDealerUseCase: ShowDealerUseCase, _orderRepository: OrderRepository): ShowOrderHistoryUseCase => {
    return async (input: ShowOrderHistoryInput) => {
        const dealerResponse = await _showDealerUseCase({dealerSiret: input.dealerSiret})
        if(!dealerResponse.success) return Result.FailureStr("Dealer not found")
        const findResponse = await _orderRepository.findOrdersByDealer(dealerResponse.value.siret)
        if(!findResponse.success) return Result.FailureStr("Cannot find order history")
        return findResponse
    }
}