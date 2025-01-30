import { createShowCustomerUseCase, ShowCustomerUseCase } from "@application/maintenance/usecases/customer/ShowCustomerUseCase";
import { customerRepository } from "../../../repositories/maintenance/customerRepository";
import { customerIdRequest } from "../../../requests/maintenance/customerIdRequest";
import { UseCaseImplementation } from "../../UseCaseImplementation";

export const showCustomerUseCase: UseCaseImplementation<typeof customerIdRequest, ShowCustomerUseCase> = async (input) => {
    const useCase = createShowCustomerUseCase(customerRepository)
    return useCase(input)
}