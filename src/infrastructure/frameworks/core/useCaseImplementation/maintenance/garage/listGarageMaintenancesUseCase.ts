import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    paginatedWithGarageSiretRequest
} from "@infrastructureCore/requests/maintenance/garage/paginatedWithGarageSiretRequest";
import {
    createListGarageMaintenancesUseCase,
    ListGarageMaintenanceUseCase
} from "@application/maintenance/usecases/garage/ListGarageMaintenancesUseCase";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";
import {ApplicationException} from "@shared/ApplicationException";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";

export const listGarageMaintenancesUseCase : UseCaseImplementation<typeof paginatedWithGarageSiretRequest, ListGarageMaintenanceUseCase> = async (input) => {
    const garageSiret = Siret.create(input.garageSiret)
    if(garageSiret instanceof ApplicationException) return Result.Failure(garageSiret)
    const useCase = createListGarageMaintenancesUseCase(maintenanceRepository, garageRepository)
    return useCase({garageSiret, page: input.page, limit: input.limit})
}