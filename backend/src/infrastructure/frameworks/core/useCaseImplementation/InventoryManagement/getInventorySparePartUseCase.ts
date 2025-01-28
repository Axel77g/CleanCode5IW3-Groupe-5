import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {sparePartReferenceRequest} from "@infrastructureCore/requests/inventoryManagement/sparePartReferenceRequest";
import {
    createGetInventorySparePartUseCase,
    GetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";

export const getInventorySparePartUseCase : UseCaseImplementation<typeof sparePartReferenceRequest,  GetInventorySparePartUseCase> = async (input) => {
    const useCase = createGetInventorySparePartUseCase(inventorySparePartRepository)
    return useCase(input)
}