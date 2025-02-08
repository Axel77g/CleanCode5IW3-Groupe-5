import { createUnregisterVehicleUseCase, UnregisterVehicleUseCase } from "@application/maintenance/usecases/vehicle/UnregisterVehicleUseCase";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {immatriculationRequest} from "@infrastructureCore/requests/maintenance/vehicle/vehicleImmatriculationRequest";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";


export const unregisterVehicleUseCase: UseCaseImplementation<typeof immatriculationRequest, UnregisterVehicleUseCase> = async (input) => {
    const immatriculation = VehicleImmatriculation.create(input.immatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createUnregisterVehicleUseCase(maintenanceEventRepository, vehicleRepository)
    return useCase({ immatriculation })
}