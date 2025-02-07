import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    registerVehiculeBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/registerVehiculeBreakdownRequest";
import {
    createRegisterVehiculeBreakdownUseCase,
    RegisterVehiculeBreakdownUseCase
} from "@application/maintenance/usecases/vehiculeBreakdown/RegisterVehiculeBreakdownUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";

export const registerVehiculeBreakdownUseCase : UseCaseImplementation<typeof registerVehiculeBreakdownRequest, RegisterVehiculeBreakdownUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.vehiculeImmatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createRegisterVehiculeBreakdownUseCase(maintenanceEventRepository, vehiculeRepository)
    return useCase({
        vehiculeImmatriculation: immatriculation,
        description: input.description,
        date: input.date,
        maintenanceId: input?.maintenanceId,
    })
}