import { createShowGarageUseCase } from "@application/maintenance/usecases/garage/ShowGarageUseCase";
import { Siret } from "@domain/shared/value-object/Siret";
import { Response } from "@expressApp/core/Response";
import { siretRequest } from "@infrastructure/frameworks/core/requests/inventoryManagement/siretRequest";
import { Controller } from "../../types/Controller";
import { GarageRepository } from "@infrastructure/frameworks/core/repositories/maintenance/garageRepository";

export const showGarageController: Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if (siret instanceof Error) return Response.Fail(400, siret.message)
    const showGarageUseCase = createShowGarageUseCase(GarageRepository)
    const showResponse = await showGarageUseCase({ siret })
    if (!showResponse.success) return Response.Fail(400, showResponse.error)
    return Response.Success(showResponse.value)
}