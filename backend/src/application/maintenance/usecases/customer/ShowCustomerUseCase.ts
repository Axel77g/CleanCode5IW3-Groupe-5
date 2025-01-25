import { Customer } from '@domain/maintenance/entities/Customer';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from '@shared/Result';
import {NotFoundEntityException} from "@shared/ApplicationException";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";

interface ShowCustomerInput extends IInputUseCase {
    customerId: string,
}

type ShowCustomerResult = Result<Customer>
export type ShowCustomerUseCase = IUseCase<ShowCustomerInput, ShowCustomerResult>
export const createShowCustomerUseCase = (_customerRepository: CustomerRepository): ShowCustomerUseCase => {
    return async (input: ShowCustomerInput) => {
        const findResponse = await _customerRepository.find(input.customerId);
        if (!findResponse.success) return findResponse;
        if (findResponse.empty) return Result.Failure(NotFoundEntityException.create("Customer not found"));
        return findResponse
    }
}
