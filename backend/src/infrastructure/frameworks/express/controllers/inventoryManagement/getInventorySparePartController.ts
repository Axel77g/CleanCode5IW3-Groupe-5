import {sparePartReferenceRequest} from "@infrastructureCore/requests/inventoryManagement/sparePartReferenceRequest";
import {Controller} from "@expressApp/types/Controller";
import {
    createGetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {inventorySparePartRepository} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {Response} from "@expressApp/core/Response";

export const getInventorySparePartController : Controller<typeof sparePartReferenceRequest> = async (payload) => {
    const getInventorySparePartUseCase = createGetInventorySparePartUseCase(inventorySparePartRepository)
    const response = await getInventorySparePartUseCase(payload)
    if(!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}