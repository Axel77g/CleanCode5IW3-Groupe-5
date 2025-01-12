import {Controller} from "@expressApp/types/Controller";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {
    createRemoveSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/RemoveSparePartInStockUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";
import {inventorySparePartRepository} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {notificationServices} from "@infrastructureCore/services/notificationServices";
import {Siret} from "@domain/shared/value-object/Siret";
import {Response} from "@expressApp/core/Response";

export const removeSparePartInStockController : Controller<typeof updateStockRequest>  = async (payload) => {
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const removeSparePartInStockUseCase = createRemoveSparePartInStockUseCase(
        inventoryManagementEventRepository,
        stockRepository,
        inventorySparePartRepository,
        notificationServices
    )
    const result = await removeSparePartInStockUseCase({
        ...payload,
        siret
    })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}