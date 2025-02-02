import { createUpdateCustomerUseCase, UpdateCustomerUseCase } from "@application/maintenance/usecases/customer/UpdateCustomerUseCase";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/updateCustomerRequest";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";


export const updateCustomerUseCase: UseCaseImplementation<typeof updateCustomerRequest, UpdateCustomerUseCase> = async (input) => {
    const useCase = createUpdateCustomerUseCase(maintenanceEventRepository, customerRepository)
    return useCase({
        customerId: input.customerId,
        name: input.name,
        phoneNumber: input.phoneNumber,
        email: input.email,
    })
}