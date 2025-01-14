import { AddressDTO } from "@domain/shared/value-object/Address";
import { AbstractEvent } from "@shared/AbstractEvent";

interface CustomerUpdatedPayload {
    customerId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: AddressDTO;
}

export class UpdateCustomerEvent extends AbstractEvent {
    static type = "CUSTOMER_UPDATED"
    readonly type = UpdateCustomerEvent.type

    readonly streamId: string;
    readonly payload: CustomerUpdatedPayload;

    constructor(
        payload: CustomerUpdatedPayload
    ) {
        super();
        this.streamId = `customer-${payload.customerId}`
        let cleanPayload = { ...payload }
        //@ts-ignore
        Object.keys(cleanPayload).forEach((key: string) => cleanPayload[key] === undefined && delete cleanPayload[key]);
        this.payload = cleanPayload;
    }
}