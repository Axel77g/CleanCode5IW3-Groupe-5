import { createRegisterCustomerUseCase } from "@application/maintenance/usecases/customer/RegisterCustomerUseCase";
import { Address } from "@domain/shared/value-object/Address";
import { registerCustomerRequest } from "@infrastructureCore/requests/maintenance/registerCustomerRequest";
import { Controller } from "../../types/Controller";
import { maintenanceEventRepository } from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import { Response } from "../../core/Response";

export const registerCustomerController: Controller<typeof registerCustomerRequest> = async (payload) => {
    const address = Address.create(payload.address)
    if (address instanceof Error) return Response.Fail(400, address)

    const registerUseCase = createRegisterCustomerUseCase(maintenanceEventRepository)
    const result = await registerUseCase({
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        address: address
    })
    if (!result.success) return Response.Fail(400, result.error)
    return Response.Success(result.value)
}