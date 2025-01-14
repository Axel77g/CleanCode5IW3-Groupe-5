import { createShowCustomerUseCase } from "@application/maintenance/usecases/customer/ShowCustomerUseCase";
import { Response } from "../../core/Response";
import { customerRepository } from "@infrastructureCore/repositories/maintenance/customerRepository";
import { customerIdRequest } from "@infrastructureCore/requests/maintenance/customerIdRequest";
import { Controller } from "../../types/Controller";

export const showCustomerController: Controller<typeof customerIdRequest> = async (payload) => {
    const customerId = payload.customerId
    const showCustomerUseCase = createShowCustomerUseCase(customerRepository)
    const result = await showCustomerUseCase({ customerId })
    if (!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}