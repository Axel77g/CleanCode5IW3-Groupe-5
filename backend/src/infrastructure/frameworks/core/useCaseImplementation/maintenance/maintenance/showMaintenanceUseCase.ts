import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {customerIdRequest} from "@infrastructureCore/requests/maintenance/customer/customerIdRequest";
import {
    createShowCustomerUseCase,
    ShowCustomerUseCase
} from "@application/maintenance/usecases/customer/ShowCustomerUseCase";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";

export const showCustomerUseCase: UseCaseImplementation<typeof customerIdRequest, ShowCustomerUseCase> = async (input) => {
    const useCase = createShowCustomerUseCase(customerRepository)
    return useCase(input)
}