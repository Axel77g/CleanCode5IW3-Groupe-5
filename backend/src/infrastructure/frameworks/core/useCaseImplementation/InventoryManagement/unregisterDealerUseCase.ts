import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createUnregisterDealerUseCase,
    UnregisterDealerUseCase
} from "@application/inventoryManagement/usecases/dealer/UnregisterDealerUseCase";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export const unregisterDealerUseCase : UseCaseImplementation<typeof siretRequest, UnregisterDealerUseCase> = async (input)=>{
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createUnregisterDealerUseCase(inventoryManagementEventRepository, dealerRepository)
    return useCase({siret})
}