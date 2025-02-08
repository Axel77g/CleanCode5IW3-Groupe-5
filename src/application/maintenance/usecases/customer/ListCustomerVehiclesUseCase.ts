import {PaginatedResult, Result} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {CustomerRepository} from "@application/maintenance/repositories/CustomerRepository";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {IUseCase} from "@shared/IUseCase";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

interface ListCustomerVehicleInput extends PaginatedInput {
    customerId: string;
}

export type ListCustomerVehiclesUseCase = IUseCase<ListCustomerVehicleInput, PaginatedResult<VehicleImmatriculation>>

const ListCustomerVehiclesErrors = {
    CUSTOMER_NOT_FOUND: NotFoundEntityException.create("Customer not found"),
    CANNOT_LIST_CUSTOMER_VehicleS: new ApplicationException("ListCustomerVehicleUseCase.CannotListCustomerVehicles", "Cannot list customer vehicles")
}
export const createListCustomerVehiclesUseCase = (_customerRepository: CustomerRepository): ListCustomerVehiclesUseCase => {
    return async (input: ListCustomerVehicleInput) => {
        const customerResponse = await _customerRepository.find(input.customerId)
        if (!customerResponse.success) return customerResponse
        if (customerResponse.empty) return Result.Failure(ListCustomerVehiclesErrors.CUSTOMER_NOT_FOUND)
        const vehiclesResponse = await _customerRepository.listCustomerVehicles(input.customerId, input)
        if (!vehiclesResponse) return Result.Failure(ListCustomerVehiclesErrors.CANNOT_LIST_CUSTOMER_VehicleS)
        return vehiclesResponse
    }
}
