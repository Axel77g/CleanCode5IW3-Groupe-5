import { createDeleteCustomerUseCase } from "@application/maintenance/usecases/customer/DeleteCustomerUseCase";
import { Response } from "../../core/Response";
import { customerRepository } from "../../repositories/maintenance/customerRepository";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { customerIdRequest } from "../../requests/maintenance/customerIdRequest";
import { Controller } from "../../types/Controller";

export const unregisterCustomerController: Controller<typeof customerIdRequest> = async (payload) => {
    const customerId = payload.customerId
    const unregisterUseCase = createDeleteCustomerUseCase(maintenanceEventRepository, customerRepository)
    const result = await unregisterUseCase({ customerId })
    if (!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)

}