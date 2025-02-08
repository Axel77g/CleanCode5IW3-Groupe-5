import { UseCaseImplementation } from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import { registerMaintenanceRequest } from "@infrastructureCore/requests/maintenance/maintenance/registerMaintenanceRequest";
import { createRegisterMaintenanceUseCase, RegisterMaintenanceUseCase } from "@application/maintenance/usecases/maintenance/RegisterMaintenanceUseCase";
import { ApplicationException } from "@shared/ApplicationException";
import { Siret } from "@domain/shared/value-object/Siret";
import { Result } from "@shared/Result";
import { MaintenanceSparePart } from "@domain/maintenance/value-object/MaintenanceSparePart";
import { maintenanceEventRepository } from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import { garageRepository } from "@infrastructureCore/repositories/maintenance/garageRepository";
import { inventorySparePartRepository } from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {
    createCheckSparesPartsReferenceExist
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";

export const registerMaintenanceUseCase: UseCaseImplementation<typeof registerMaintenanceRequest, RegisterMaintenanceUseCase> = async (input) => {
    const garageSiret = Siret.create(input.siret);
    if (garageSiret instanceof ApplicationException) return Result.Failure(garageSiret);
    const vehiculeImmatriculation = VehiculeImmatriculation.create(input.vehiculeImmatriculation);
    if (vehiculeImmatriculation instanceof ApplicationException) return Result.Failure(vehiculeImmatriculation);
    const checkUseCase = createCheckSparesPartsReferenceExist(inventorySparePartRepository);
    const useCase = createRegisterMaintenanceUseCase(maintenanceEventRepository, garageRepository, checkUseCase, vehiculeRepository);
    return useCase({
        vehiculeImmatriculation,
        garageSiret,
        status: input.status as MaintenanceStatusEnum,
        maintenanceSpareParts: input.maintenanceSpareParts as MaintenanceSparePart[],
        recommendation: input.recommendation,
        date: new Date(input.date)
    });
};