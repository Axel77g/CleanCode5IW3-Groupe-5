import {AbstractEvent} from "@shared/AbstractEvent";
import {OrderDTO} from "../entities/Order";

export type RegisterOrderEventPayload = Omit<OrderDTO, "statusHistory">
export class RegisterOrderEvent extends AbstractEvent{
    static type = "ORDER_REGISTERED"
    readonly type = RegisterOrderEvent.type

    readonly streamId :  string;
    readonly payload : RegisterOrderEventPayload;

    constructor(payload : RegisterOrderEventPayload) {
        super();
        this.streamId = `order-${payload.orderId}`
        this.payload = payload;
    }
}