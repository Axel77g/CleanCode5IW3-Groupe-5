import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {
    createListInventorySparePartUseCase,
    ListInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";

export const listInventorySparePartUseCase : UseCaseImplementation<typeof paginatedRequest, ListInventorySparePartUseCase> = async (input) => {
    const useCase = createListInventorySparePartUseCase(inventorySparePartRepository);
    return useCase(input);
}