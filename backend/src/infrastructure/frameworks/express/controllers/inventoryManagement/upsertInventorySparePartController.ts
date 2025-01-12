import {sparePartRequest} from "@expressApp/requests/inventoryManagement/sparePartRequest";
import {Controller} from "@expressApp/types/Controller";
import {
    createUpsertInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/UpsertInventorySparePartUseCase";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {Response} from "@expressApp/core/Response";

export const upsertInventorySparePartController : Controller<typeof sparePartRequest> = async (payload) => {
    const upsertInventorySparePartUseCase = createUpsertInventorySparePartUseCase(inventoryManagementEventRepository)
    const response = await upsertInventorySparePartUseCase(payload)
    if(!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}