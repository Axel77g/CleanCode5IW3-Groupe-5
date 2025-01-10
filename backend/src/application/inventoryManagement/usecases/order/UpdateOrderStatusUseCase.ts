import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DealerRepository} from "../../repositories/DealerRepository";
import {RegisterOrderEvent} from "@domain/inventoryManagement/events/RegisterOrderEvent";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {OrderRepository} from "../../repositories/OrderRepository";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {UpdateOrderStatusEvent} from "@domain/inventoryManagement/events/UpdateOrderStatusEvent";

interface UpdateOrderInput extends IInputUseCase{
    orderId: string,
    status : OrderStatusEnum
}
export type RegisterOrderUseCase = IUseCase<UpdateOrderInput, Result>

const registerOrderErrors = {
    NOT_FOUND_DEALER: new ApplicationException("RegisterOrderUseCase.NotFoundDealer", "Cannot create order for not found dealer"),

}

export const updateOrderStatusUseCase = (_eventRepository : EventRepository, _orderRepository: OrderRepository) : RegisterOrderUseCase => {
    return async (input: UpdateOrderInput) => {
        const orderResponse = await _orderRepository.findOrderById(input.orderId);
        if(!orderResponse.success) return Result.Failure(registerOrderErrors.NOT_FOUND_DEALER)
        const order = orderResponse.value.applyStatus(input.status)
        if(order instanceof Error) return Result.Failure(order)
        const updateOrderStatusEvent = new UpdateOrderStatusEvent({
            orderId: input.orderId,
            status: input.status
        })
        const repositoryResponse = await _eventRepository.storeEvent(updateOrderStatusEvent);
        if(!repositoryResponse.success) return repositoryResponse
        return Result.Success("Order updated successfully")
    }
}