import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { UnregisterCustomerEvent } from '@domain/maintenance/events/customer/UnregisterCustomerEvent';
import { NotFoundEntityException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UnregisterCustomerInput extends IInputUseCase {
    customerId: string
}

export type UnregisterCustomerUseCase = IUseCase<UnregisterCustomerInput, Result>

const unregisteredCustomerErrors = {
    NOT_FOUND_CUSTOMER: NotFoundEntityException.create("Cannot delete customer not found"),
    CANNOT_DELETE_CUSTOMER: "Cannot delete customer",
}

export const createUnregisterCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository): UnregisterCustomerUseCase => {
    return async (input: UnregisterCustomerInput) => {
        const customer = await _customerRepository.find(input.customerId);
        if (!customer.success) return customer
        if (customer.empty) return Result.Failure(unregisteredCustomerErrors.NOT_FOUND_CUSTOMER)
        const deleteResponse = await _eventRepository.storeEvent(customer.value.unregisterEvent())
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister customer")
        return Result.Success("Customer unregistered")
    }
}