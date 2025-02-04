import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createListCustomerVehiculesUseCase,
    ListCustomerVehiculesUseCase
} from "@application/maintenance/usecases/customer/ListCustomerVehiculesUseCase";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";
import {
    paginatedWithCustomerIdRequest
} from "@infrastructureCore/requests/maintenance/customer/paginatedWithCustomerIdRequest";

export const listCustomerVehiculesUseCase : UseCaseImplementation<typeof paginatedWithCustomerIdRequest, ListCustomerVehiculesUseCase> = async (input) => {
    const customerId = input.customerId
    const useCase = createListCustomerVehiculesUseCase(customerRepository)
    return useCase({customerId, page: input.page, limit: input.limit})
}