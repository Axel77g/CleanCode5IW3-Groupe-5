import {AbstractEvent} from "../../../shared/AbstractEvent";
import {OrderDTO} from "../entities/Order";

export class RegisterOrderEvent extends AbstractEvent{
    static type = "ORDER_REGISTERED"
    readonly type = RegisterOrderEvent.type

    readonly streamId :  string;
    readonly payload : OrderDTO;

    constructor(payload : OrderDTO) {
        super();
        this.streamId = `order-${payload.orderId}`
        this.payload = payload;
    }
}