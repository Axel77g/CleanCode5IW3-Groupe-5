import {Controller} from "@expressApp/types/Controller";
import {Response} from "@expressApp/core/Response";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {createUnregisterDealerUseCase} from "@application/inventoryManagement/usecases/dealer/UnregisterDealerUseCase";
import {siretRequest} from "@expressApp/requests/inventoryManagement/siretRequest";

export const unregisterDealerController : Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const unregisterDealerUseCase = createUnregisterDealerUseCase(inventoryManagementEventRepository)
    const unregisterResponse = await unregisterDealerUseCase({siret})
    if(!unregisterResponse.success) return Response.Fail(400, unregisterResponse.error)
    return Response.Success(unregisterResponse.value)
}