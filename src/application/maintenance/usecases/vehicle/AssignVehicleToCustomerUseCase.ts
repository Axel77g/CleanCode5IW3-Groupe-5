import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

interface AssignVehicleToCustomerInput extends IInputUseCase {
    customerId: string,
    vehicleImmatriculation: VehicleImmatriculation,
}

export type AssignVehicleToCustomerUseCase = IUseCase<AssignVehicleToCustomerInput, Result>

export const createAssignVehicleToCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository, _vehicleRepository: VehicleRepository): AssignVehicleToCustomerUseCase => {
    return async (input: AssignVehicleToCustomerInput) => {
        const customerResponse = await _customerRepository.find(input.customerId);
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.FailureStr("Customer not found")
        const vehicleResponse = await _vehicleRepository.getByImmatriculation(input.vehicleImmatriculation);
        if (!vehicleResponse.success) return vehicleResponse
        if (vehicleResponse.empty) return Result.FailureStr("Vehicle not found")
        const eventResponse = await _eventRepository.storeEvent(vehicleResponse.value.assignToCustomerEvent(customerResponse.value.customerId))
        if (!eventResponse.success) return eventResponse
        return Result.Success("Vehicle assigned to customer")
    }
}