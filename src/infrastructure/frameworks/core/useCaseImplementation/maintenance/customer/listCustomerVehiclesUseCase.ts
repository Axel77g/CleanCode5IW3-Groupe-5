import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createListCustomerVehiclesUseCase,
    ListCustomerVehiclesUseCase
} from "@application/maintenance/usecases/customer/ListCustomerVehiclesUseCase";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";
import {
    paginatedWithCustomerIdRequest
} from "@infrastructureCore/requests/maintenance/customer/paginatedWithCustomerIdRequest";

export const listCustomerVehiclesUseCase : UseCaseImplementation<typeof paginatedWithCustomerIdRequest, ListCustomerVehiclesUseCase> = async (input) => {
    const customerId = input.customerId
    const useCase = createListCustomerVehiclesUseCase(customerRepository)
    return useCase({customerId, page: input.page, limit: input.limit})
}