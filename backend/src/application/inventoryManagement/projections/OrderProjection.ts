import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Order } from "@domain/inventoryManagement/entities/Order";
import { RegisterOrderEvent } from "@domain/inventoryManagement/events/RegisterOrderEvent";
import { UpdateOrderStatusEvent } from "@domain/inventoryManagement/events/UpdateOrderStatusEvent";
import { IEvent } from "@shared/AbstractEvent";
import { Result, VoidResult } from "@shared/Result";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderProjection extends AbstractProjection {
    constructor(private _orderRepository: OrderRepository) { super() }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterOrderEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateOrderStatusEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterOrderEvent.type]: this.applyRegisterEvent,
            [UpdateOrderStatusEvent.type]: this.applyUpdateStatusEvent
        }
    }

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

    async applyRegisterEvent(event: RegisterOrderEvent): Promise<VoidResult> {
        const order = Order.fromObject(event.payload)
        if (order instanceof Error) return Result.Failure(order)
        return this._orderRepository.store(order)
    }

    async applyUpdateStatusEvent(event: UpdateOrderStatusEvent): Promise<VoidResult> {
        const orderResponse = await this._orderRepository.findOrderById(event.payload.orderId)
        if (!orderResponse.success) return orderResponse
        const order = orderResponse.value.applyStatus(event.payload.status)
        if (order instanceof Error) return Result.Failure(order)
        return this._orderRepository.store(order)
    }

}