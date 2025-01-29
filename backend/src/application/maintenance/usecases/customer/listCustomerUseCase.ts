import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { IUseCase } from "@shared/IUseCase";
import { PaginatedInput } from "@shared/PaginatedInput";
import { PaginatedResult, Result } from "@shared/Result";

type ListCustomerResult = PaginatedResult<Customer>
export type ListCustomerUseCase = IUseCase<PaginatedInput, ListCustomerResult>
export const createListCustomerUseCase = (_customerRepository: CustomerRepository): ListCustomerUseCase => {
    return async (input: PaginatedInput) => {
        const findResponse = await _customerRepository.list(input);
        if (!findResponse.success) return Result.FailureStr("Cannot list customers")
        return findResponse
    }
}