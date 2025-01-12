import {Controller} from "@expressApp/types/Controller";
import {updateOrderStatusRequest} from "@expressApp/requests/inventoryManagement/updateOrderStatusRequest";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {orderRepository} from "@expressApp/repositories/inventoryManagement/orderRepository";
import {createUpdateOrderStatusUseCase} from "@application/inventoryManagement/usecases/order/UpdateOrderStatusUseCase";
import {Response} from "@expressApp/core/Response";

export const updateOrderStatusController : Controller<typeof updateOrderStatusRequest> = async (process) =>{
    const updateOrderUseCase = createUpdateOrderStatusUseCase(inventoryManagementEventRepository, orderRepository)
    const response = await updateOrderUseCase(process)
    if(!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}