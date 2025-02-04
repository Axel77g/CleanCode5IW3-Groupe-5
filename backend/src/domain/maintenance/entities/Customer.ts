import { Address, AddressDTO } from "@domain/shared/value-object/Address";
import { ApplicationException } from "@shared/ApplicationException";
import { randomUUID } from "node:crypto";
import { RegisterCustomerEvent } from "../events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "../events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "../events/customer/UpdateCustomerEvent";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export interface CustomerDTO {
    customerId: string,
    name: string;
    phoneNumber: string;
    email: string;
    address: AddressDTO;
    vehiculeImmatriculations: VehiculeImmatriculation[];
}

export class Customer {
    constructor(
        public readonly customerId: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly address: Address,
        public readonly vehiculeImmatriculations : VehiculeImmatriculation[]
    ) { }

    static fromObject(object: CustomerDTO): Customer | ApplicationException {
        const address = Address.create(object.address)
        if (address instanceof ApplicationException) {
            return address;
        }
        return Customer.create({
            customerId: object.customerId,
            name: object.name,
            phoneNumber: object.phoneNumber,
            email: object.email,
            address,
            vehiculeImmatriculations: object.vehiculeImmatriculations
        })
    }

    static create(object: {
        customerId: string,
        name: string,
        phoneNumber: string,
        email: string,
        address: Address,
        vehiculeImmatriculations: VehiculeImmatriculation[]
    }) {
        return new Customer(
            object.customerId,
            object.name,
            object.phoneNumber,
            object.email,
            object.address,
            object.vehiculeImmatriculations
        );
    }

    registerEvent(): RegisterCustomerEvent {
        return new RegisterCustomerEvent({
            customerId: this.customerId,
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            address: this.address,
            vehiculeImmatriculations: this.vehiculeImmatriculations
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
        return new Customer(
            this.customerId,
            object.name ?? this.name,
            object.phoneNumber ?? this.phoneNumber,
            object.email ?? this.email,
            this.address,
            this.vehiculeImmatriculations
        )
    }

    unregisterEvent(): UnregisterCustomerEvent {
        return new UnregisterCustomerEvent({
            customerId: this.customerId,
        })
    }

    addVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Customer {
        return new Customer(
            this.customerId,
            this.name,
            this.phoneNumber,
            this.email,
            this.address,
            [...this.vehiculeImmatriculations, vehiculeImmatriculation]
        )
    }

    removeVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Customer {
        return new Customer(
            this.customerId,
            this.name,
            this.phoneNumber,
            this.email,
            this.address,
            this.vehiculeImmatriculations.filter(vehicule => vehicule !== vehiculeImmatriculation)
        )
    }

    static generateID(): string {
        return randomUUID();
    }
}