import {
    createUpdateVehicleUseCase,
    UpdateVehicleUseCase
} from "@application/maintenance/usecases/vehicle/UpdateVehicleUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateVehicleRequest} from "@infrastructureCore/requests/maintenance/vehicle/updateVehicleRequest";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
export const updateVehicleUseCase: UseCaseImplementation<typeof updateVehicleRequest, UpdateVehicleUseCase> = async (input) => {
    const immatriculation = VehicleImmatriculation.create(input.immatriculation);
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation);
    const maintenanceInterval = input.maintenanceInterval ? VehicleMaintenanceInterval.create(
        input.maintenanceInterval?.duration
        , input.maintenanceInterval?.mileage
        , input.maintenanceInterval?.lastMaintenance
    ) : undefined
    if(maintenanceInterval instanceof ApplicationException) return Result.Failure(maintenanceInterval)
    const useCase = createUpdateVehicleUseCase(maintenanceEventRepository, vehicleRepository);
    return useCase({
        immatriculation,
        mileage: input.mileage,
        maintenanceInterval,
        status: input.status,
    })
};
