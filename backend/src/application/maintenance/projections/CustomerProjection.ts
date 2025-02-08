import { AbstractProjection } from "@application/shared/projections/AbstractProjection";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { Customer } from "@domain/maintenance/entities/Customer";
import { RegisterCustomerEvent } from "@domain/maintenance/events/customer/RegisterCustomerEvent";
import { UnregisterCustomerEvent } from "@domain/maintenance/events/customer/UnregisterCustomerEvent";
import { UpdateCustomerEvent } from "@domain/maintenance/events/customer/UpdateCustomerEvent";
import { Result, VoidResult } from "@shared/Result";
import { CustomerRepository } from "../repositories/CustomerRepository";
import {AssignVehicleToCustomerEvent} from "@domain/maintenance/events/vehicle/AssignVehicleToCustomerEvent";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {UnregisterVehicleEvent} from "@domain/maintenance/events/vehicle/UnregisterVehicleEvent";

export class CustomerProjection extends AbstractProjection {
    constructor(private _customerRepository: CustomerRepository) {
        super();
    }

    init(projectionJobScheduler: ProjectionJobScheduler) {
        projectionJobScheduler.schedule(RegisterCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UpdateCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(AssignVehicleToCustomerEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterVehicleEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [RegisterCustomerEvent.type]: this.applyRegisterEvent,
            [UpdateCustomerEvent.type]: this.applyUpdateEvent,
            [UnregisterCustomerEvent.type]: this.applyUnregisteredEvent,
            [AssignVehicleToCustomerEvent.type]: this.applyAssignVehicleToCustomerEvent,
            [UnregisterVehicleEvent.type]: this.applyUnregisteredVehicleEvent
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
            vehicleImmatriculations: []
        })
        if (customer instanceof ApplicationException) return Result.FailureStr("Cannot update customer");
        await this._customerRepository.store(customer)
        return Result.SuccessVoid()
    }

    async applyAssignVehicleToCustomerEvent(event: AssignVehicleToCustomerEvent): Promise<VoidResult> {
        const customerResponse = await this._customerRepository.find(event.payload.customerId);
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.FailureStr("Customer not found")
        const vehicleImmatriculation = VehicleImmatriculation.create(event.payload.immatriculation)
        if (vehicleImmatriculation instanceof ApplicationException) return Result.FailureStr("Cannot assign vehicle to customer")

        const oldCustomerResponse = await this._customerRepository.getCustomerByVehicleImmatriculation(vehicleImmatriculation)
        if(!oldCustomerResponse.success) return oldCustomerResponse

        console.log(oldCustomerResponse.value?.customerId,"OLD CUSTOMER")
        console.log(event.payload.customerId,"NEW CUSTOMER")

        if(!oldCustomerResponse.empty)
        {
            if(oldCustomerResponse.value.customerId === event.payload.customerId) return Result.SuccessVoid()
            await this._customerRepository.store(oldCustomerResponse.value.removeVehicle(vehicleImmatriculation))
        }
        return this._customerRepository.store(customerResponse.value.addVehicle(vehicleImmatriculation))
    }

    async applyUnregisteredVehicleEvent(event : UnregisterVehicleEvent){
        const vehicleImmatriculation = VehicleImmatriculation.create(event.payload.immatriculation)
        if (vehicleImmatriculation instanceof ApplicationException) return Result.FailureStr("Cannot unasign vehicle to customer")
        const customerResponse = await this._customerRepository.getCustomerByVehicleImmatriculation(vehicleImmatriculation)
        if(!customerResponse.success) return customerResponse
        if(customerResponse.empty) return Result.FailureStr("No customer linked to this vehicle")
        return this._customerRepository.store(customerResponse.value.removeVehicle(vehicleImmatriculation))
    }
}