import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/updateMaintenanceRequest";
import {
    createUpdateMaintenanceUseCase,
    UpdateMaintenanceUseCase
} from "@application/maintenance/usecases/maintenance/UpdateMaintenanceUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";


export const updateMaintenanceUseCase : UseCaseImplementation<typeof updateMaintenanceRequest, UpdateMaintenanceUseCase> = async (input) => {
    const garageSiret = input.siret ? Siret.create(input.siret) : null
    if(garageSiret instanceof ApplicationException) return Result.Failure(garageSiret);
    const useCase = createUpdateMaintenanceUseCase(maintenanceEventRepository, maintenanceRepository)
    return useCase({
        ...input,
        garageSiret
    })
}