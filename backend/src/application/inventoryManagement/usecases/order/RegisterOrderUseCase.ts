import { IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {OrderRepository} from "../../repositories/OrderRepository";
import {Order} from "../../../../domain/inventoryManagement/entities/Order";
import {OrderLine} from "../../../../domain/inventoryManagement/value-object/OrderLine";
import {Result} from "../../../../shared/Result";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";

interface RegisterOrderInput extends IInputUseCase{
    dealer: DealerSiret,
    deliveryDate: Date,
    orderedDate: Date,
    orderLines: OrderLine[]
}
export type RegisterOrderUseCase = IUseCase<RegisterOrderInput, Result>
export const registerOrderUseCase = (_orderRepository: OrderRepository) : RegisterOrderUseCase => {
    return async (input: RegisterOrderInput) => {
        const order = new Order(
            Order.generateID(),
            input.orderedDate,
            input.deliveryDate,
            input.dealer,
            input.orderLines
        );
        const repositoryResponse = await _orderRepository.store(order);
        if(!repositoryResponse.success) return Result.FailureStr("Cannot register order")
        return Result.Success("Order registered successfully")
    }
}