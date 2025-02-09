import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {registerVehicleRequest} from "@infrastructureCore/requests/maintenance/vehicle/registerVehicleRequest";
import {createRegisterVehicleUseCase, RegisterVehicleUseCase} from "@application/maintenance/usecases/vehicle/RegisterVehicleUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {VehicleVin} from "@domain/maintenance/value-object/VehicleVin";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";

export const registerVehicleUseCase : UseCaseImplementation<typeof registerVehicleRequest, RegisterVehicleUseCase> = async (input) => {
    const immatriculation = VehicleImmatriculation.create(input.immatriculation);
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation);

    const vin = VehicleVin.create(input.vin);
    if (vin instanceof ApplicationException) return Result.Failure(vin);

    const maintenanceInterval = VehicleMaintenanceInterval.create(
        input.maintenanceInterval.duration,
        input.maintenanceInterval.mileage,
        input.maintenanceInterval.lastMaintenance ? {
            date: new Date(input.maintenanceInterval.lastMaintenance.date),
            mileage: input.maintenanceInterval.lastMaintenance.mileage,
        } : {
            date: new Date(),
            mileage: 0,
        }
    );

    if (maintenanceInterval instanceof ApplicationException) return Result.Failure(maintenanceInterval);

    const warranty = Period.create(input.warranty.startDate, input.warranty.endDate);
    if (warranty instanceof ApplicationException) return Result.Failure(warranty);

    const useCase = createRegisterVehicleUseCase(maintenanceEventRepository, vehicleRepository);
    return useCase({
        ...input,
        immatriculation,
        brand: "Triumph",
        maintenanceInterval,
        vin,
        warranty,
    });
};
