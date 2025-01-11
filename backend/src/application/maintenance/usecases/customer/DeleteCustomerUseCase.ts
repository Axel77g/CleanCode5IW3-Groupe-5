import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { UnregisterCustomerEvent } from '@domain/maintenance/events/UnregisterCustomerEvent';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface DeleteCustomerUseCaseInput extends IInputUseCase {
    customerId: string
}

export type DeleteCustomerUseCase = IUseCase<DeleteCustomerUseCaseInput, Result>
export const createDeleteCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository): DeleteCustomerUseCase => {
    return async (input: DeleteCustomerUseCaseInput) => {
        const findResponse = await _customerRepository.find(input.customerId);
        if (!findResponse.success) return Result.FailureStr("Customer not found")

        const unregisterCustomerEvent = new UnregisterCustomerEvent({
            customerId: input.customerId
        })
        const deleteResponse = await _eventRepository.storeEvent(unregisterCustomerEvent);
        if (!deleteResponse.success) return Result.FailureStr("Cannot delete customer")
        return Result.Success("Customer deleted")
    }
}