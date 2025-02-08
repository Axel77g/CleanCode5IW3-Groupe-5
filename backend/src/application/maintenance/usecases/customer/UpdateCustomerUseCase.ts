import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { NotFoundEntityException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UpdateCustomerInput extends IInputUseCase {
    customerId: string,
    name ?: string,
    phoneNumber ?: string,
    email ?: string
}

export type UpdateCustomerUseCase = IUseCase<UpdateCustomerInput, Result>

const updateCustomerErrors = {
    NOT_FOUND_CUSTOMER: NotFoundEntityException.create("Cannot update customer for not found customer")
}

export const createUpdateCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository): UpdateCustomerUseCase => {
    return async (input: UpdateCustomerInput) => {
        const existingCustomerResponse = await _customerRepository.find(input.customerId);
        if (!existingCustomerResponse.success) return existingCustomerResponse
        if (existingCustomerResponse.empty) return Result.Failure(updateCustomerErrors.NOT_FOUND_CUSTOMER)
        const customer = existingCustomerResponse.value.update(input)
        const response = await _eventRepository.storeEvent(customer.updateCustomerEvent())
        if (!response.success) return response
        return Result.Success("Customer updated")
    }
}