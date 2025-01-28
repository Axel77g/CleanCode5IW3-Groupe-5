import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateStockRequest} from "@infrastructureCore/requests/inventoryManagement/updateStockRequest";
import {
    createRemoveSparePartInStockUseCase,
    RemoveSparePartInStockUseCase
} from "@application/inventoryManagement/usecases/stock/RemoveSparePartInStockUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {notificationServices} from "@infrastructureCore/services/notificationServices";

export const removeSparePartInStockUseCase : UseCaseImplementation<typeof updateStockRequest, RemoveSparePartInStockUseCase> = async (input) =>{
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createRemoveSparePartInStockUseCase(
        inventoryManagementEventRepository,
        stockRepository,
        inventorySparePartRepository,
        notificationServices
    )
    return useCase({
        ...input,
        siret
    })
}