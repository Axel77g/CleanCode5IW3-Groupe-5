import {OrderRepository} from "../repositories/OrderRepository";
import {RegisterOrderEvent} from "@domain/inventoryManagement/events/RegisterOrderEvent";
import {UpdateOrderStatusEvent} from "@domain/inventoryManagement/events/UpdateOrderStatusEvent";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {IEvent} from "@shared/AbstractEvent";

export class OrderProjection {
    constructor(private _orderRepository: OrderRepository) {}

    async receive(event: IEvent): Promise<void> {
        switch (event.constructor) {
            case RegisterOrderEvent:
                await this.applyRegisterEvent(event as RegisterOrderEvent)
                break;
            case UpdateOrderStatusEvent:
                await this.applyUpdateStatusEvent(event as UpdateOrderStatusEvent)
                break;
        }
    }

    async applyRegisterEvent(event: RegisterOrderEvent) {
        const order = Order.fromObject(event.payload)
        if(order instanceof Error) return console.error(order)
        await this._orderRepository.store(order)
    }

    async applyUpdateStatusEvent(event: UpdateOrderStatusEvent) {
        const orderResponse = await this._orderRepository.findOrderById(event.payload.orderId)
        if(!orderResponse.success) return console.error(orderResponse)
        const order = orderResponse.value.applyStatus(event.payload.status)
        if(order instanceof Error) return console.error(order)
        await this._orderRepository.store(order)
    }

}