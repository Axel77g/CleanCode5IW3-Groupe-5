import {Controller} from "@expressApp/types/Controller";
import {Response} from "@expressApp/core/Response";
import {Siret} from "@domain/shared/value-object/Siret";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export const showDealerController : Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const showDealerUseCase = createShowDealerUseCase(dealerRepository)
    const showResponse = await showDealerUseCase({siret})
    if(!showResponse.success) return Response.Fail(400, showResponse.error)
    return Response.Success(showResponse.value)
}