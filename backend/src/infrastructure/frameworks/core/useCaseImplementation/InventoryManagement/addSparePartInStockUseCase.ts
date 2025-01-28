import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {
    AddSparePartInStockUseCase,
    createAddSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/AddSparePartInStockUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";
import {
    createGetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";

export const addSparePartInStockUseCase : UseCaseImplementation<typeof updateStockRequest, AddSparePartInStockUseCase> = async (input) =>{
    const siret = Siret.create(input.siret)
    if(siret instanceof Error) return Result.Failure(siret)
    const _getInventorySparePartUseCase = createGetInventorySparePartUseCase(inventorySparePartRepository)
    const useCase = createAddSparePartInStockUseCase(inventoryManagementEventRepository, _getInventorySparePartUseCase)
    return useCase({
        ...input,
        siret
    })
}