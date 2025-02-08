import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";
import {
    createListCustomerUseCase,
    ListCustomerUseCase
} from "@application/maintenance/usecases/customer/ListCustomerUseCase";

export const listCustomerUseCase: UseCaseImplementation<typeof paginatedRequest, ListCustomerUseCase> = async (input) => {
    const useCase = createListCustomerUseCase(customerRepository)
    return useCase(input)
}