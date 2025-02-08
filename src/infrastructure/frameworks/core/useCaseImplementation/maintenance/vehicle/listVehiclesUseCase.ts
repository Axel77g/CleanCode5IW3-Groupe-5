import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {
    createListVehiclesUseCase,
    ListVehiclesUseCase
} from "@application/maintenance/usecases/vehicle/ListVehiclesUseCase";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";

export const listVehiclesUseCase: UseCaseImplementation<typeof paginatedRequest, ListVehiclesUseCase> = async (input) => {
    const useCase = createListVehiclesUseCase(vehicleRepository)
    return useCase(input)
}