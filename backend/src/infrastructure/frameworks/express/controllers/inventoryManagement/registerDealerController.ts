import {Controller} from "@expressApp/types/Controller";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {Response} from "@expressApp/core/Response";
import {createRegisterDealerUseCase} from "@application/inventoryManagement/usecases/dealer/RegisterDealerUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {Address} from "@domain/shared/value-object/Address";

export const registerDealerController : Controller<typeof registerDealerRequest> = async (payload) => {
    const address = Address.create(payload.address)
    if(address instanceof Error) return Response.Fail(400, address.message)
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const registerDealerUseCase = createRegisterDealerUseCase(inventoryManagementEventRepository)
    const registerResponse = await registerDealerUseCase({
        siret,
        name: payload.name,
        address,
        phoneNumber: payload.phoneNumber
    })
    if(!registerResponse.success) return Response.Fail(400, registerResponse.error)
    return Response.Success(registerResponse.value)
}