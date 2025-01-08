import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { CustomerRepository } from "../../repositories/CustomerRepository";

interface DeleteCustomerUseCaseInput extends IInputUseCase {
    id: string
}

export type DeleteCustomerUseCase = IUseCase<DeleteCustomerUseCaseInput, Result>
export const deleteCustomerUseCase = (_customerRepository: CustomerRepository): DeleteCustomerUseCase => {
    return async (input: DeleteCustomerUseCaseInput) => {
        const deleteResponse = await _customerRepository.delete(input.id);
        if (!deleteResponse.success) return Result.FailureStr("Cannot delete customer")
        return Result.Success("Customer deleted")
    }
}