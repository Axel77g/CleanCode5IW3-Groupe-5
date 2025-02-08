import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";

interface UpdateOrderInput extends IInputUseCase{
    orderId: string,
    status : OrderStatusEnum
}
export type UpdateOrderStatusUseCase = IUseCase<UpdateOrderInput, Result>

const registerOrderErrors = {
    NOT_FOUND_ORDER: NotFoundEntityException.create("Cannot update status for not found order"),
}

export const createUpdateOrderStatusUseCase = (_eventRepository : EventRepository, _orderRepository: OrderRepository) : UpdateOrderStatusUseCase => {
    return async (input: UpdateOrderInput) => {
        const orderResponse = await _orderRepository.findOrderById(input.orderId);
        if(!orderResponse.success) return orderResponse
        if(orderResponse.empty) return Result.Failure(registerOrderErrors.NOT_FOUND_ORDER)
        const order = orderResponse.value.applyStatus(input.status)
        if(order instanceof ApplicationException) return Result.Failure(order)
        const repositoryResponse = await _eventRepository.storeEvent(order.updateStatusEvent());
        if(!repositoryResponse.success) return repositoryResponse
        return Result.Success("Order updated successfully")
    }
}