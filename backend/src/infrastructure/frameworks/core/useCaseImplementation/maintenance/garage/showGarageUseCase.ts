import { createShowGarageUseCase, ShowGarageUseCase } from "@application/maintenance/usecases/garage/ShowGarageUseCase";
import { Siret } from "@domain/shared/value-object/Siret";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {siretRequest} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";


export const showGarageUseCase: UseCaseImplementation<typeof siretRequest, ShowGarageUseCase> = async (input) => {
    const siret = Siret.create(input.siret)
    if (siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createShowGarageUseCase(garageRepository)
    return useCase({ siret })
}