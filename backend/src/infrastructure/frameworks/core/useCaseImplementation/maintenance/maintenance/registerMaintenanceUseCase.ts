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

export const registerMaintenanceUseCase: UseCaseImplementation<typeof registerMaintenanceRequest, RegisterMaintenanceUseCase> = async (input) => {
    const garageSiret = Siret.create(input.garageSiret);
    if (garageSiret instanceof ApplicationException) return Result.Failure(garageSiret);
    const vehiculeImmatriculation = VehiculeImmatriculation.create(input.vehiculeImmatriculation);
    if (vehiculeImmatriculation instanceof ApplicationException) return Result.Failure(vehiculeImmatriculation);
    const useCase = createRegisterMaintenanceUseCase(maintenanceEventRepository, garageRepository, inventorySparePartRepository);
    return useCase({
        maintenanceId: input.maintenanceId,
        vehiculeImmatriculation,
        garageSiret,
        status: input.status as MaintenanceStatusEnum,
        maintenanceSpareParts: input.maintenanceSpareParts as MaintenanceSparePart[],
        recommendation: input.recommendation,
        date: new Date(input.date)
    });
};