import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Customer } from "@domain/maintenance/entities/Customer";
import { RegisterCustomerEvent } from "@domain/maintenance/events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "@domain/maintenance/events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "@domain/maintenance/events/customer/UpdateCustomerEvent";
import { Result, VoidResult } from "@shared/Result";
import { CustomerRepository } from "../repositories/CustomerRepository";

export class CustomerProjection extends AbstractProjection {
    constructor(private _customerRepository: CustomerRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterCustomerEvent.type, this.constructor.name)

    }

    bindEvents() {
        return {
            [RegisterCustomerEvent.type]: this.applyRegisterEvent,
            [UpdateCustomerEvent.type]: this.applyUpdateEvent,
            [UnregisterCustomerEvent.type]: this.applyUnregisteredEvent
        }
    }

    async applyRegisterEvent(event: RegisterCustomerEvent): Promise<VoidResult> {
        const customer = Customer.fromObject(event.payload)
        if (customer instanceof Error) return Result.FailureStr("Cannot register customer");
        return this._customerRepository.store(customer)
    }

    async applyUnregisteredEvent(event: UnregisterCustomerEvent): Promise<VoidResult> {
        const response = await this._customerRepository.find(event.payload.customerId)
        if (!response.success) return Result.FailureStr("Cannot delete customer")
        return this._customerRepository.delete(event.payload.customerId)
    }

    async applyUpdateEvent(event: UpdateCustomerEvent): Promise<VoidResult> {
        const customer = await this._customerRepository.find(event.payload.customerId)
        if (!customer.success) return Result.FailureStr("Cannot update customer")

        const updatedCustomer = Customer.fromObject({
            ...customer,
            ...event.payload
        })
        if (updatedCustomer instanceof Error) return Result.FailureStr("Cannot update customer")
        return this._customerRepository.store(updatedCustomer);
    }
}