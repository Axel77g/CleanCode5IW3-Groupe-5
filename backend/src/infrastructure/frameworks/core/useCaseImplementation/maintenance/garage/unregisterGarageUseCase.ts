import { createUnregisterGarageUseCase, UnregisterGarageUseCase } from "@application/maintenance/usecases/garage/UnregisterGarageUseCase";
import { Siret } from "@domain/shared/value-object/Siret";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";


export const unregisterGarageUseCase: UseCaseImplementation<typeof siretRequest, UnregisterGarageUseCase> = async (input) => {
    const siret = Siret.create(input.siret)
    if (siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createUnregisterGarageUseCase(inventoryManagementEventRepository, garageRepository)
    return useCase({ siret })
}