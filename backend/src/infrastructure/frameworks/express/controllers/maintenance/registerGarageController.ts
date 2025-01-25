import { createRegisterGarageUseCase } from "@application/maintenance/usecases/garage/RegisterGarageUseCase";
import { Address } from "@domain/shared/value-object/Address";
import { Siret } from "@domain/shared/value-object/Siret";
import { Response } from "@expressApp/core/Response";
import { Controller } from "@expressApp/types/Controller";
import { maintenanceEventRepository } from "@infrastructure/frameworks/core/repositories/maintenance/maintenanceEventRepository";
import { registerGarageRequest } from "@infrastructure/frameworks/core/requests/maintenance/registerGarageRequest";

export const registerGarageController: Controller<typeof registerGarageRequest> = async (payload) => {
    const address = Address.create(payload.address)
    if (address instanceof Error) return Response.Fail(400, address.message)
    const siret = Siret.create(payload.siret)
    if (siret instanceof Error) return Response.Fail(400, siret.message)
    const registerGarageUseCase = createRegisterGarageUseCase(maintenanceEventRepository)
    const registerResponse = await registerGarageUseCase({
        siret,
        name: payload.name,
        address,
        phoneNumber: payload.phoneNumber
    })
    if (!registerResponse.success) return Response.Fail(400, registerResponse.error)
    return Response.Success(registerResponse.value)
}