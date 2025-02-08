import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {sparePartRequest} from "@infrastructureCore/requests/inventoryManagement/sparePartRequest";
import {
    createUpsertInventorySparePartUseCase,
    UpsertInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/UpsertInventorySparePartUseCase";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";

export const upsertInventorySparePartUseCase : UseCaseImplementation<typeof sparePartRequest, UpsertInventorySparePartUseCase> = async (input) => {
    const useCase = createUpsertInventorySparePartUseCase(inventoryManagementEventRepository)
    return useCase(input)
}