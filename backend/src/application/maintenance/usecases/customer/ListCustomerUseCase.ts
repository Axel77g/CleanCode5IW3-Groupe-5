import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { IUseCase } from "@shared/IUseCase";
import { PaginatedInput } from "@shared/PaginatedInput";
import { PaginatedResult, Result } from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";

export type ListCustomerUseCase = IUseCase<PaginatedInput, PaginatedResult<Customer>>

const listCustomerErrors = {
    CANNOT_LIST_CUSTOMERS: new ApplicationException("ListCustomerUseCase.CannotListCustomers", "Cannot list customers")
}
export const createListCustomerUseCase = (_customerRepository: CustomerRepository): ListCustomerUseCase => {
    return async (input: PaginatedInput) => {
        const customersResponse = await _customerRepository.listCustomers(input);
        if (!customersResponse.success) return Result.Failure(listCustomerErrors.CANNOT_LIST_CUSTOMERS)
        return customersResponse
    }
}