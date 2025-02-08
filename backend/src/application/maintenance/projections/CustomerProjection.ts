import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Customer } from "@domain/maintenance/entities/Customer";
import { RegisterCustomerEvent } from "@domain/maintenance/events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "@domain/maintenance/events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "@domain/maintenance/events/customer/UpdateCustomerEvent";
import { Result, VoidResult } from "@shared/Result";
import { CustomerRepository } from "../repositories/CustomerRepository";
import {AssignVehiculeToCustomerEvent} from "@domain/maintenance/events/vehicule/AssignVehiculeToCustomerEvent";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";

export class CustomerProjection extends AbstractProjection {
    constructor(private _customerRepository: CustomerRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(AssignVehiculeToCustomerEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterCustomerEvent.type]: this.applyRegisterEvent,
            [UpdateCustomerEvent.type]: this.applyUpdateEvent,
            [UnregisterCustomerEvent.type]: this.applyUnregisteredEvent,
            [AssignVehiculeToCustomerEvent.type]: this.applyAssignVehiculeToCustomerEvent
        }
    }

    async applyRegisterEvent(event: RegisterCustomerEvent): Promise<VoidResult> {
        const customer = Customer.fromObject(event.payload)
        if (customer instanceof ApplicationException) return Result.FailureStr("Cannot register customer");
        return this._customerRepository.store(customer)
    }

    async applyUnregisteredEvent(event: UnregisterCustomerEvent): Promise<VoidResult> {
        const response = await this._customerRepository.find(event.payload.customerId)
        if (!response.success) return Result.FailureStr("Cannot delete customer")
        return this._customerRepository.delete(event.payload.customerId)
    }

    async applyUpdateEvent(event: UpdateCustomerEvent): Promise<VoidResult> {
        const customer = Customer.fromObject({
            customerId: event.payload.customerId,
            name: event.payload.name,
            email: event.payload.email,
            phoneNumber: event.payload.phoneNumber,
            address: event.payload.address,
            vehiculeImmatriculations: []
        })
        if (customer instanceof ApplicationException) return Result.FailureStr("Cannot update customer");
        await this._customerRepository.store(customer)
        return Result.SuccessVoid()
    }

    async applyAssignVehiculeToCustomerEvent(event: AssignVehiculeToCustomerEvent): Promise<VoidResult> {
        const customerResponse = await this._customerRepository.find(event.payload.customerId);
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.FailureStr("Customer not found")
        const vehiculeImmatriculation = VehiculeImmatriculation.create(event.payload.immatriculation)
        if (vehiculeImmatriculation instanceof ApplicationException) return Result.FailureStr("Cannot assign vehicule to customer")
        return this._customerRepository.store(customerResponse.value.addVehicule(vehiculeImmatriculation))
    }
}