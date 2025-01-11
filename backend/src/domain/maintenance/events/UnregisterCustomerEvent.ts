import { AbstractEvent } from "@shared/AbstractEvent";

export class UnregisterCustomerEvent extends AbstractEvent {
    static type = 'CUSTOMER_UNREGISTERED';
    readonly type = UnregisterCustomerEvent.type;

    readonly streamId: string;
    readonly payload: {
        customerId: string;
    };

    constructor(payload: { customerId: string }) {
        super();
        this.streamId = `customer-${payload.customerId}`;
        this.payload = payload;
    }
}