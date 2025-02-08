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
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {
    createCheckSparesPartsReferenceExist
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";

export const registerMaintenanceUseCase: UseCaseImplementation<typeof registerMaintenanceRequest, RegisterMaintenanceUseCase> = async (input) => {
    const garageSiret = Siret.create(input.siret);
    if (garageSiret instanceof ApplicationException) return Result.Failure(garageSiret);
    const vehicleImmatriculation = VehicleImmatriculation.create(input.vehicleImmatriculation);
    if (vehicleImmatriculation instanceof ApplicationException) return Result.Failure(vehicleImmatriculation);
    const checkUseCase = createCheckSparesPartsReferenceExist(inventorySparePartRepository);
    const useCase = createRegisterMaintenanceUseCase(maintenanceEventRepository, garageRepository, checkUseCase, vehicleRepository);
    return useCase({
        vehicleImmatriculation,
        garageSiret,
        status: input.status as MaintenanceStatusEnum,
        maintenanceSpareParts: input.maintenanceSpareParts as MaintenanceSparePart[],
        recommendation: input.recommendation,
        date: new Date(input.date)
    });
};