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
import {
    createCheckSparesPartsReferenceExist
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";


export const updateMaintenanceUseCase : UseCaseImplementation<typeof updateMaintenanceRequest, UpdateMaintenanceUseCase> = async (input) => {
    let siretVal : null | string | undefined = input.siret
    if(siretVal == "-1") siretVal = null
    const garageSiret = siretVal ? Siret.create(siretVal) : null
    if(garageSiret instanceof ApplicationException) return Result.Failure(garageSiret);
    const checkUseCase = createCheckSparesPartsReferenceExist(inventorySparePartRepository);
    const useCase = createUpdateMaintenanceUseCase(maintenanceEventRepository, maintenanceRepository,garageRepository,checkUseCase)
    return useCase({
        ...input,
        garageSiret
    })
}