import { AbstractEvent } from "@shared/AbstractEvent";
import { CustomerDTO } from "../entities/Customer";

export class RegisterCustomerEvent extends AbstractEvent {
    static type = 'CUSTOMER_REGISTERED';
    readonly type = RegisterCustomerEvent.type;

    readonly streamId: string;
    readonly payload: CustomerDTO;

    constructor(payload: CustomerDTO) {
        super();
        this.streamId = `customer-${payload.customerId}`;
        this.payload = payload;
    }
}