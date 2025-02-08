import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    registerVehicleBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehicleBreakdown/registerVehicleBreakdownRequest";
import {
    createRegisterVehicleBreakdownUseCase,
    RegisterVehicleBreakdownUseCase
} from "@application/maintenance/usecases/vehicleBreakdown/RegisterVehicleBreakdownUseCase";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";

export const registerVehicleBreakdownUseCase : UseCaseImplementation<typeof registerVehicleBreakdownRequest, RegisterVehicleBreakdownUseCase> = async (input) => {
    const immatriculation = VehicleImmatriculation.create(input.vehicleImmatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createRegisterVehicleBreakdownUseCase(maintenanceEventRepository, vehicleRepository)
    return useCase({
        vehicleImmatriculation: immatriculation,
        description: input.description,
        date: input.date,
        maintenanceId: input?.maintenanceId,
    })
}