import {
    createUpdateVehiculeUseCase,
    UpdateVehiculeUseCase
} from "@application/maintenance/usecases/vehicule/UpdateVehiculeUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/updateVehiculeRequest";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
export const updateVehiculeUseCase: UseCaseImplementation<typeof updateVehiculeRequest, UpdateVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation);
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation);
    const maintenanceInterval = input.maintenanceInterval ? VehiculeMaintenanceInterval.create(
        input.maintenanceInterval?.duration
        , input.maintenanceInterval?.mileage
        , input.maintenanceInterval?.lastMaintenance
    ) : undefined
    if(maintenanceInterval instanceof ApplicationException) return Result.Failure(maintenanceInterval)
    const useCase = createUpdateVehiculeUseCase(maintenanceEventRepository, vehiculeRepository);
    return useCase({
        immatriculation,
        mileage: input.mileage,
        maintenanceInterval,
        status: input.status,
    })
};
