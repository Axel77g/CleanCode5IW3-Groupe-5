import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    paginatedWithImmatriculationRequest
} from "@infrastructureCore/requests/maintenance/vehicule/paginatedWithImmatriculationRequest";
import {
    createListVehiculeMaintenanceUseCase,
    ListVehiculeMaintenanceUseCase
} from "@application/maintenance/usecases/vehicule/ListVehiculeMaintenanceUseCase";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";

export const listVehiculeMaintenanceUseCase : UseCaseImplementation<typeof paginatedWithImmatriculationRequest, ListVehiculeMaintenanceUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if(immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createListVehiculeMaintenanceUseCase(maintenanceRepository, vehiculeRepository)
    return useCase({immatriculation, page: input.page, limit: input.limit})
}