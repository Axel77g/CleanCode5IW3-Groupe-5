import {PaginatedResult, Result} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {IUseCase} from "@shared/IUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface ListCustomerVehiculeInput extends PaginatedInput {
    customerId: string;
}

export type ListCustomerVehiculesUseCase = IUseCase<ListCustomerVehiculeInput, PaginatedResult<VehiculeImmatriculation>>

const ListCustomerVehiculesErrors = {
    CUSTOMER_NOT_FOUND: NotFoundEntityException.create("Customer not found"),
    CANNOT_LIST_CUSTOMER_VEHICULES: new ApplicationException("ListCustomerVehiculeUseCase.CannotListCustomerVehicules", "Cannot list customer vehicules")
}
export const createListCustomerVehiculesUseCase = (_customerRepository: CustomerRepository): ListCustomerVehiculesUseCase => {
    return async (input: ListCustomerVehiculeInput) => {
        const customerResponse = await _customerRepository.find(input.customerId)
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.Failure(ListCustomerVehiculesErrors.CUSTOMER_NOT_FOUND)
        const vehiculesResponse = await _customerRepository.listCustomerVehicules(input.customerId, input)
        if (!vehiculesResponse) return Result.Failure(ListCustomerVehiculesErrors.CANNOT_LIST_CUSTOMER_VEHICULES)
        return vehiculesResponse
    }
}
