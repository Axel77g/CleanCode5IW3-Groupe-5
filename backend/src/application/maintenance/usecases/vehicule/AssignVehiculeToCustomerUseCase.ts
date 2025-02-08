import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface AssignVehiculeToCustomerInput extends IInputUseCase {
    customerId: string,
    vehiculeImmatriculation: VehiculeImmatriculation,
}

export type AssignVehiculeToCustomerUseCase = IUseCase<AssignVehiculeToCustomerInput, Result>

export const createAssignVehiculeToCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository, _vehiculeRepository: VehiculeRepository): AssignVehiculeToCustomerUseCase => {
    return async (input: AssignVehiculeToCustomerInput) => {
        const customerResponse = await _customerRepository.find(input.customerId);
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.FailureStr("Customer not found")
        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.vehiculeImmatriculation);
        if (!vehiculeResponse.success) return vehiculeResponse
        if (vehiculeResponse.empty) return Result.FailureStr("Vehicule not found")
        const eventResponse = await _eventRepository.storeEvent(vehiculeResponse.value.assignToCustomerEvent(customerResponse.value.customerId))
        if (!eventResponse.success) return eventResponse
        return Result.Success("Vehicule assigned to customer")
    }
}