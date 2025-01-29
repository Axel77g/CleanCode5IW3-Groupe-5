import { createListCustomerUseCase, ListCustomerUseCase } from "@application/maintenance/usecases/customer/listCustomerUseCase";
import { paginatedRequest } from "../../requests/paginatedRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";


export const listCustomerUseCase : UseCaseImplementation<typeof paginatedRequest, ListCustomerUseCase> = async (input) =>{
    const useCase = createListCustomerUseCase(customerRepository)
    return useCase(input)
}