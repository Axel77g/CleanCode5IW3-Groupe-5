import {AbstractEvent} from "@shared/AbstractEvent";
import {OrderStatusEnum} from "../enums/OrderStatusEnum";

export interface UpdateOrderStatusEventPayload {
    orderId: string,
    status: OrderStatusEnum
}

export class UpdateOrderStatusEvent extends AbstractEvent{
    static type = "ORDER_STATUS_UPDATED"
    readonly type = UpdateOrderStatusEvent.type

    readonly streamId :  string;
    readonly payload : UpdateOrderStatusEventPayload

    constructor(payload : UpdateOrderStatusEventPayload){
        super();
        this.streamId = `order-${payload.orderId}-`
        this.payload = payload;
    }
}