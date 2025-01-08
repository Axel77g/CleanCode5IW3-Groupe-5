import { Customer } from "../../../../domain/maintenance/entities/Customer";
import { CustomerAddress } from "../../../../domain/maintenance/value-object/CustomerAddress";
import { VehicleImmatriculation } from "../../../../domain/shared/value-object/VehicleImmatriculation";
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { CustomerRepository } from "../../repositories/CustomerRepository";

interface RegisterCustomerInput extends IInputUseCase {
    id: string,
    name: string,
    phoneNumber: string,
    email: string
    vehiculeImmatrictulation: VehicleImmatriculation,
    address: CustomerAddress
}

export type RegisterCustomerUseCase = IUseCase<RegisterCustomerInput, Result>
export const registerCustomerUseCase = (_customerRepository: CustomerRepository): RegisterCustomerUseCase => {
    return async (input: RegisterCustomerInput) => {
        const customer = new Customer(
            input.id,
            input.name,
            input.phoneNumber,
            input.email,
            input.vehiculeImmatrictulation,
            input.address
        );
        const storeResponse = await _customerRepository.store(customer);
        if (!storeResponse.success) return Result.FailureStr("Cannot register customer")
        return Result.Success("Customer registered")
    }
}