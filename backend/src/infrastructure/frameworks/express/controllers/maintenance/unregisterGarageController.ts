import { createUnregisterGarageUseCase } from "@application/maintenance/usecases/garage/UnregisterGarageUseCase";
import { Siret } from "@domain/shared/value-object/Siret";
import { Response } from "@expressApp/core/Response";
import { maintenanceEventRepository } from "@infrastructure/frameworks/core/repositories/maintenance/maintenanceEventRepository";
import { siretRequest } from "@infrastructure/frameworks/core/requests/inventoryManagement/siretRequest";
import { Controller } from "../../types/Controller";

export const unregisterGarageController: Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if (siret instanceof Error) return Response.Fail(400, siret.message)
    const unregisterGarageUseCase = createUnregisterGarageUseCase(maintenanceEventRepository)
    const unregisterResponse = await unregisterGarageUseCase({ siret })
    if (!unregisterResponse.success) return Response.Fail(400, unregisterResponse.error)
    return Response.Success(unregisterResponse.value)
}