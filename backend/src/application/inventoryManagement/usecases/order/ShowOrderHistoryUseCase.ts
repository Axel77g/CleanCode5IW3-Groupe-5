import { Order } from "../../../../domain/inventoryManagement/entities/Order";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ShowDealerUseCase } from "../dealer/ShowDealerUseCase";

interface ShowOrderHistoryInput extends IInputUseCase {
    siret: Siret
}
type ShowOrderHistoryResult = Result<Order[]>
export type ShowOrderHistoryUseCase = IUseCase<ShowOrderHistoryInput, ShowOrderHistoryResult>
export const showOrderHistoryUseCase = (_showDealerUseCase: ShowDealerUseCase, _orderRepository: OrderRepository): ShowOrderHistoryUseCase => {
    return async (input: ShowOrderHistoryInput) => {
        const dealerResponse = await _showDealerUseCase({ siret: input.siret })
        if (!dealerResponse.success) return Result.FailureStr("Dealer not found")
        const findResponse = await _orderRepository.findOrdersByDealer(dealerResponse.value.siret)
        if (!findResponse.success) return Result.FailureStr("Cannot find order history")
        return findResponse
    }
}