import { Customer } from '../../../../domain/maintenance/entities/Customer';
import { VehicleImmatriculation } from '../../../../domain/shared/value-object/VehicleImmatriculation';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from '../../../../shared/Result';
import { CustomerRepository } from '../../repositories/CustomerRepository';

interface ShowCustomerInput extends IInputUseCase {
    VehicleImmatriculation: VehicleImmatriculation
}

type ShowCustomerResult = Result<Customer>
export type ShowCustomerUseCase = IUseCase<ShowCustomerInput, ShowCustomerResult>
export const showCustomerUseCase = (_customerRepository: CustomerRepository): ShowCustomerUseCase => {
    return async (input: ShowCustomerInput) => {
        const findResponse = await _customerRepository.find(input.VehicleImmatriculation);
        if (!findResponse.success) return Result.FailureStr("Customer not found")
        return findResponse
    }
}
