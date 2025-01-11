import { createRegisterCustomerUseCase } from "@application/maintenance/usecases/customer/RegisterCustomerUseCase";
import { DealerAddress } from "@domain/shared/value-object/DealerAddress";
import { registerCustomerRequest } from "../../requests/maintenance/registerCustomerRequest";
import { Controller } from "../../types/Controller";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { Response } from "../../core/Response";

export const registerCustomerController: Controller<typeof registerCustomerRequest> = async (payload) => {
    const address = DealerAddress.create(payload.address)
    if (address instanceof Error) return Response.Fail(400, address.message)

    const registerUseCase = createRegisterCustomerUseCase(maintenanceEventRepository)
    const result = await registerUseCase({
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        address: address
    })
    if (!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}