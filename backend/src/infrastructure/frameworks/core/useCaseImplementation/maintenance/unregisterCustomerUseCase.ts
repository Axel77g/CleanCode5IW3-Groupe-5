import { createUnregisterCustomerUseCase, UnregisterCustomerUseCase } from "@application/maintenance/usecases/customer/UnregisterCustomerUseCase";
import { customerRepository } from "../../repositories/maintenance/customerRepository";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { customerIdRequest } from "../../requests/maintenance/customerIdRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const unregisterCustomerUseCase: UseCaseImplementation<typeof customerIdRequest, UnregisterCustomerUseCase> = async (input) => {
    const useCase = createUnregisterCustomerUseCase(maintenanceEventRepository, customerRepository)
    return useCase({ customerId: input.customerId })
}