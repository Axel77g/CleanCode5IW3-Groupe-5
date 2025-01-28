import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createUpdateOrderStatusUseCase,
    UpdateOrderStatusUseCase
} from "@application/inventoryManagement/usecases/order/UpdateOrderStatusUseCase";
import {updateOrderStatusRequest} from "@infrastructureCore/requests/inventoryManagement/updateOrderStatusRequest";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {orderRepository} from "@infrastructureCore/repositories/inventoryManagement/orderRepository";

export const updateOrderStatusUseCase : UseCaseImplementation<typeof updateOrderStatusRequest, UpdateOrderStatusUseCase> = async (input) => {
    const useCase = createUpdateOrderStatusUseCase(inventoryManagementEventRepository, orderRepository)
    return useCase(input)
}