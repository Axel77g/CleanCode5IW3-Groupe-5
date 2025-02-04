import { createListCustomerUseCase, ListCustomerUseCase } from "@application/maintenance/usecases/customer/ListCustomerUseCase";
import { customerRepository } from "@infrastructureCore/repositories/maintenance/customerRepository";
import { paginatedRequest } from "../../../requests/paginatedRequest";
import { UseCaseImplementation } from "../../UseCaseImplementation";


export const listCustomerUseCase: UseCaseImplementation<typeof paginatedRequest, ListCustomerUseCase> = async (input) => {
    const useCase = createListCustomerUseCase(customerRepository)
    return useCase(input)
}