import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {AssignVehiculeToCustomerEvent} from "@domain/maintenance/events/vehicule/AssignVehiculeToCustomerEvent";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface AssignVehiculeToCustomerInput extends IInputUseCase {
    customerId: string,
    immatriculation: VehiculeImmatriculation,
}

export type AssignVehiculeToCustomerUseCase = IUseCase<AssignVehiculeToCustomerInput, Result>

export const createAssignVehiculeToCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository, _vehiculeRepository: VehiculeRepository): AssignVehiculeToCustomerUseCase => {
    return async (input: AssignVehiculeToCustomerInput) => {
        const customerResponse = await _customerRepository.find(input.customerId);
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.FailureStr("Customer not found")

        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!vehiculeResponse.success) return vehiculeResponse
        if (vehiculeResponse.empty) return Result.FailureStr("Vehicule not found")

        const event = new AssignVehiculeToCustomerEvent({
            customerId: input.customerId,
            immatriculation: input.immatriculation.value
        })

        const eventResponse = await _eventRepository.save(event)
        if (!eventResponse.success) return eventResponse
            
    }
}