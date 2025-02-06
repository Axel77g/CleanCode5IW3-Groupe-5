import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createListVehiculeBreakdownsUseCase,
    ListVehiculeBreakdownsUseCase
} from "@application/maintenance/usecases/vehicule/ListVehiculeBreakdownsUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {
    paginatedWithImmatriculationRequest
} from "@infrastructureCore/requests/maintenance/vehicule/paginatedWithImmatriculationRequest";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {vehiculeBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehiculeBreakdownRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";

export const listVehiculesBreakdownUseCase : UseCaseImplementation<typeof paginatedWithImmatriculationRequest, ListVehiculeBreakdownsUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if(immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createListVehiculeBreakdownsUseCase(vehiculeBreakdownRepository, vehiculeRepository)
    return useCase({immatriculation, page: input.page, limit: input.limit})
}