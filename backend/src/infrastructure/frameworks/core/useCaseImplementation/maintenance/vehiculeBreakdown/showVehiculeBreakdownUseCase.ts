import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createShowVehiculeBreakdownUseCase,
    ShowVehiculeBreakdownUseCase
} from "@application/maintenance/usecases/vehiculeBreakdown/ShowVehiculeBreakdownUseCase";
import {vehiculeBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehiculeBreakdownRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {
    showVehiculeBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/showVehiculeBreakdownRequest";

export const showVehiculeBreakdownUseCase : UseCaseImplementation<typeof showVehiculeBreakdownRequest, ShowVehiculeBreakdownUseCase> = async (input) => {
    const vehiculeImmatriculation = VehiculeImmatriculation.create(input.vehiculeImmatriculation)
    if (vehiculeImmatriculation instanceof ApplicationException) return Result.Failure(vehiculeImmatriculation)
    const useCase = createShowVehiculeBreakdownUseCase(vehiculeBreakdownRepository)
    return useCase({vehiculeImmatriculation})
}