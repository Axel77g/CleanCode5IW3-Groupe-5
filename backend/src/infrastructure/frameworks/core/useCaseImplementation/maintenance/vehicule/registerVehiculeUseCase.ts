import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {registerVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/registerVehiculeRequest";
import {createRegisterVehiculeUseCase, RegisterVehiculeUseCase} from "@application/maintenance/usecases/vehicule/RegisterVehiculeUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeVin} from "@domain/maintenance/value-object/VehiculeVin";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";

export const registerVehiculeUseCase : UseCaseImplementation<typeof registerVehiculeRequest, RegisterVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation);
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation);

    const vin = VehiculeVin.create(input.vin);
    if (vin instanceof ApplicationException) return Result.Failure(vin);

    const maintenanceInterval = VehiculeMaintenanceInterval.create(
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

    const useCase = createRegisterVehiculeUseCase(maintenanceEventRepository, vehiculeRepository);
    return useCase({
        ...input,
        immatriculation,
        brand: "Triumph",
        maintenanceInterval,
        vin,
        warranty,
    });
};
