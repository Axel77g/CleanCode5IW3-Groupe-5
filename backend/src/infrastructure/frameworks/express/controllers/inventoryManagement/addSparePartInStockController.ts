import {updateStockRequest} from "@expressApp/requests/inventoryManagement/updateStockRequest";
import {Controller} from "@expressApp/types/Controller";
import {Siret} from "@domain/shared/value-object/Siret";
import {Response} from "@expressApp/core/Response";
import {
    createAddSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/AddSparePartInStockUseCase";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {
    createGetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {inventorySparePartRepository} from "@expressApp/repositories/inventoryManagement/inventorySparePartRepository";

export const  addSparePartInStockController : Controller<typeof updateStockRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const getInventorySparePartUseCase = createGetInventorySparePartUseCase(inventorySparePartRepository)
    const addSparePartInStockUseCase = createAddSparePartInStockUseCase(inventoryManagementEventRepository, getInventorySparePartUseCase)
    const response = await addSparePartInStockUseCase({
        ...payload,
        siret
    })
    if(!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}