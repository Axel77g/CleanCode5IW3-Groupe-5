import {RegisterOrderEvent} from "@domain/inventoryManagement/events/RegisterOrderEvent";
import {UpdateOrderStatusEvent} from "@domain/inventoryManagement/events/UpdateOrderStatusEvent";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";

export class OrderProjection extends AbstractProjection {
    constructor(private _orderRepository: OrderRepository) { super() }

    init(projectionJobScheduler : ProjectionJobScheduler){
        projectionJobScheduler.schedule(RegisterOrderEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateOrderStatusEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterDealerEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterOrderEvent.type] : this.applyRegisterEvent,
            [UpdateOrderStatusEvent.type] : this.applyUpdateStatusEvent,
            [UnregisterDealerEvent.type] : this.applyUnregisterDealerEvent
        }
    }

    async applyRegisterEvent(event: RegisterOrderEvent) : Promise<VoidResult> {
        const statusHistory = [
            {
                status: event.payload.status ?? OrderStatusEnum.PENDING,
                date: event.createdAt
            }
        ]
        const order = Order.fromObject({
            ...event.payload,
            statusHistory
        })
        if(order instanceof Error) return Result.Failure(order)
        return this._orderRepository.store(order)
    }

    async applyUpdateStatusEvent(event: UpdateOrderStatusEvent) : Promise<VoidResult> {
        const orderResponse = await this._orderRepository.findOrderById(event.payload.orderId)
        if(!orderResponse.success) return orderResponse
        if(orderResponse.empty) return Result.Failure(NotFoundEntityException.create("Order not found during update projection, this should not happen, please check the event store"))
        const order = orderResponse.value.applyStatus(event.payload.status)
        if(order instanceof ApplicationException) return Result.Failure(order)
        const statusHistory = [
            ...order.statusHistory,
            {
                status: event.payload.status,
                date: event.createdAt
            }
        ]
        const orderWithNewHistory = order.setStatusHistory(statusHistory)
        return this._orderRepository.store(orderWithNewHistory)
    }

    async applyUnregisterDealerEvent(event: UnregisterDealerEvent) : Promise<VoidResult> {
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        return this._orderRepository.deleteOrdersByDealerSiret(siret)
    }

}