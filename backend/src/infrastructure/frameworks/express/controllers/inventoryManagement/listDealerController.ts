import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {createListDealerUseCase} from "@application/inventoryManagement/usecases/dealer/listDealerUseCase";
import {Controller} from "@expressApp/types/Controller";
import {Response} from "@expressApp/core/Response";
export const listDealerController : Controller<typeof paginatedRequest> = async (payload) => {
    const listDealerUseCase = createListDealerUseCase(dealerRepository)
    const listResponse = await listDealerUseCase(payload)
    if(!listResponse.success) return Response.Fail(400, listResponse.error)
    return Response.SuccessPaginated(listResponse.value, listResponse.total, listResponse.page, listResponse.limit)
}