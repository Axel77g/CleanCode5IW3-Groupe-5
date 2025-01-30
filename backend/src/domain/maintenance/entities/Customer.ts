import { Address, AddressDTO } from "@domain/shared/value-object/Address";
import { ApplicationException } from "@shared/ApplicationException";
import { randomUUID } from "node:crypto";
import { RegisterCustomerEvent } from "../events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "../events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "../events/customer/UpdateCustomerEvent";

export interface CustomerDTO {
    customerId: string,
    name: string;
    phoneNumber: string;
    email: string;
    address: AddressDTO;
}

export class Customer {
    constructor(
        public readonly customerId: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly address: Address,
    ) { }

    registerEvent(): RegisterCustomerEvent {
        return new RegisterCustomerEvent({
            customerId: this.customerId,
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            address: this.address,
        });
    }

    updateCustomerEvent(): UpdateCustomerEvent {
        return new UpdateCustomerEvent({
            customerId: this.customerId,
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            address: this.address,
        })
    }

    update(object: {
        name?: string,
        phoneNumber?: string,
        email?: string,
    }) {
        return new Customer(this.customerId, object.name || this.name, object.phoneNumber || this.phoneNumber, object.email || this.email, this.address);
    }

    unregisterEvent(): UnregisterCustomerEvent {
        return new UnregisterCustomerEvent({
            customerId: this.customerId,
        })
    }

    static generateID(): string {
        return randomUUID();
    }

    static fromObject(object: CustomerDTO): Customer | ApplicationException {
        const address = Address.create(object.address)
        if (address instanceof ApplicationException) {
            return address;
        }

        return new Customer(object.customerId, object.name, object.phoneNumber, object.email, address);
    }

    static create(customer: {
        customerId: string,
        name: string,
        phoneNumber: string,
        email: string,
        address: Address
    }) {
        return new Customer(customer.customerId, customer.name, customer.phoneNumber, customer.email, customer.address);
    }
}