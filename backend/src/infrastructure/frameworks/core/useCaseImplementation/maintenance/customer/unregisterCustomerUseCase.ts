import { createUnregisterCustomerUseCase, UnregisterCustomerUseCase } from "@application/maintenance/usecases/customer/UnregisterCustomerUseCase";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {customerIdRequest} from "@infrastructureCore/requests/maintenance/customerIdRequest";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";



export const unregisterCustomerUseCase: UseCaseImplementation<typeof customerIdRequest, UnregisterCustomerUseCase> = async (input) => {
    const useCase = createUnregisterCustomerUseCase(maintenanceEventRepository, customerRepository)
    return useCase({ customerId: input.customerId })
}