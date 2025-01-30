import { createUpdateCustomerUseCase, UpdateCustomerUseCase } from "@application/maintenance/usecases/customer/UpdateCustomerUseCase";
import { customerRepository } from "../../repositories/maintenance/customerRepository";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { updateCustomerRequest } from "../../requests/maintenance/updateCustomerRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const updateCustomerUseCase: UseCaseImplementation<typeof updateCustomerRequest, UpdateCustomerUseCase> = async (input) => {
    const useCase = createUpdateCustomerUseCase(maintenanceEventRepository, customerRepository)
    return useCase({
        customerId: input.customerId,
        name: input.name,
        phoneNumber: input.phoneNumber,
        email: input.email,
    })
}