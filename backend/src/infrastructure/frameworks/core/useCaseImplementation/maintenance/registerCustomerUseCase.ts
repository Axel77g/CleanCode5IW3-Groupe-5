import { createRegisterCustomerUseCase, RegisterCustomerUseCase } from "@application/maintenance/usecases/customer/RegisterCustomerUseCase";
import { Address } from "@domain/shared/value-object/Address";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import { customerRepository } from "../../repositories/maintenance/customerRepository";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { registerCustomerRequest } from "../../requests/maintenance/registerCustomerRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const registerCustomerUseCase: UseCaseImplementation<typeof registerCustomerRequest, RegisterCustomerUseCase> = async (input) => {
    const address = Address.create(input.address)
    if (address instanceof ApplicationException) return Result.Failure(address)
    const useCase = createRegisterCustomerUseCase(maintenanceEventRepository, customerRepository)
    return useCase({
        ...input,
        address: address
    })
}