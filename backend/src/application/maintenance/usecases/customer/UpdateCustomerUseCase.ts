import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface UpdateCustomerInput extends IInputUseCase {
    customerId: string,
    name: string,
    phoneNumber: string,
    email: string
}

export type UpdateCustomerUseCase = IUseCase<UpdateCustomerInput, Result>

const updateCustomerErrors = {
    NOT_FOUND_CUSTOMER: "Customer not found",
    CANNOT_UPDATE_CUSTOMER: "Cannot update customer"
}

const updateCustomerSuccesses = {
    CUSTOMER_UPDATED: "Customer updated successfully"
}

export const createUpdateCustomerUseCase = (_eventRepository: EventRepository, _customerRepository: CustomerRepository): UpdateCustomerUseCase => {
    return async (input: UpdateCustomerInput) => {
        const customerResponse = await _customerRepository.find(input.customerId);
        if (!customerResponse.success) return customerResponse;
        if (customerResponse.empty) return Result.FailureStr(updateCustomerErrors.NOT_FOUND_CUSTOMER);
        const customer = customerResponse.value.updateCustomerEvent();
        if (customer instanceof ApplicationException) return Result.Failure(customer);
        const repositoryResponse = await _eventRepository.storeEvent(customerResponse.value.updateCustomerEvent());
        if (!repositoryResponse.success) return Result.FailureStr(updateCustomerErrors.CANNOT_UPDATE_CUSTOMER);
        return Result.Success(updateCustomerSuccesses.CUSTOMER_UPDATED);
    }
}