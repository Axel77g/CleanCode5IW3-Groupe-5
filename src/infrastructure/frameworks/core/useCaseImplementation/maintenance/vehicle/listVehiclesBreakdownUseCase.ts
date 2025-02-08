import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createListVehicleBreakdownsUseCase,
    ListVehicleBreakdownsUseCase
} from "@application/maintenance/usecases/vehicle/ListVehicleBreakdownsUseCase";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {
    paginatedWithImmatriculationRequest
} from "@infrastructureCore/requests/maintenance/vehicle/paginatedWithImmatriculationRequest";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {vehicleBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehicleBreakdownRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";

export const listVehiclesBreakdownUseCase : UseCaseImplementation<typeof paginatedWithImmatriculationRequest, ListVehicleBreakdownsUseCase> = async (input) => {
    const immatriculation = VehicleImmatriculation.create(input.immatriculation)
    if(immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createListVehicleBreakdownsUseCase(vehicleBreakdownRepository, vehicleRepository)
    return useCase({immatriculation, page: input.page, limit: input.limit})
}