import {Controller} from "@expressApp/types/Controller";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {
    createListInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";
import {inventorySparePartRepository} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {Response} from "@expressApp/core/Response";

export const listInventorySparePartController : Controller<typeof paginatedRequest> = async (payload) => {
    const listInventorySparePartUseCase = createListInventorySparePartUseCase(inventorySparePartRepository);
    const response = await listInventorySparePartUseCase(payload);
    if(!response.success) return Response.Fail(400, response.error.message);
    return Response.SuccessPaginated(response.value, response.total, response.page, response.limit);
}