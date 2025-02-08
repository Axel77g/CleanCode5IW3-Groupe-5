import { ApplicationException } from "@shared/ApplicationException";
import { randomUUID } from "node:crypto";
import { RegisterCustomerEvent } from "../events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "../events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "../events/customer/UpdateCustomerEvent";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {Address, AddressDTO} from "@domain/shared/value-object/Address";

export interface CustomerDTO {
    customerId: string,
    name: string;
    phoneNumber: string;
    email: string;
    address: AddressDTO;
    vehicleImmatriculations: string[];
}

export class Customer {
    constructor(
        public readonly customerId: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly address: Address,
        public readonly vehicleImmatriculations : VehicleImmatriculation[]
    ) { }

    static fromObject(object: CustomerDTO): Customer | ApplicationException {
        const address = Address.create(object.address)
        if (address instanceof ApplicationException) {
            return address;
        }

        const vehicleImmatriculations = object.vehicleImmatriculations.map(vehicleImmatriculation => VehicleImmatriculation.create(vehicleImmatriculation))
        if(vehicleImmatriculations.some(vehicle => vehicle instanceof ApplicationException)) {
            return vehicleImmatriculations.find(vehicle => vehicle instanceof ApplicationException) as ApplicationException
        }

        return Customer.create({
            customerId: object.customerId,
            name: object.name,
            phoneNumber: object.phoneNumber,
            email: object.email,
            address,
            vehicleImmatriculations : vehicleImmatriculations as VehicleImmatriculation[]
        })
    }

    static create(object: {
        customerId: string,
        name: string,
        phoneNumber: string,
        email: string,
        address: Address,
        vehicleImmatriculations: VehicleImmatriculation[]
    }) {
        return new Customer(
            object.customerId,
            object.name,
            object.phoneNumber,
            object.email,
            object.address,
            object.vehicleImmatriculations
        );
    }

    registerEvent(): RegisterCustomerEvent {
        return new RegisterCustomerEvent({
            customerId: this.customerId,
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            address: this.address,
            vehicleImmatriculations: this.vehicleImmatriculations.map(vehicleImmatriculation => vehicleImmatriculation.getValue())
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
            this.vehicleImmatriculations
        )
    }

    unregisterEvent(): UnregisterCustomerEvent {
        return new UnregisterCustomerEvent({
            customerId: this.customerId,
        })
    }

    addVehicle(vehicleImmatriculation: VehicleImmatriculation): Customer {
        return new Customer(
            this.customerId,
            this.name,
            this.phoneNumber,
            this.email,
            this.address,
            [...this.vehicleImmatriculations, vehicleImmatriculation]
        )
    }

    removeVehicle(vehicleImmatriculation: VehicleImmatriculation): Customer {
        return new Customer(
            this.customerId,
            this.name,
            this.phoneNumber,
            this.email,
            this.address,
            this.vehicleImmatriculations.filter(vehicle => vehicle.getValue() !== vehicleImmatriculation.getValue())
        )
    }

    static generateID(): string {
        return randomUUID();
    }
}