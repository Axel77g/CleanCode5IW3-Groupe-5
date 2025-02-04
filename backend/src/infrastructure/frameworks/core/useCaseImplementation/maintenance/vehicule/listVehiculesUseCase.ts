import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {
    createListVehiculesUseCase,
    ListVehiculesUseCase
} from "@application/maintenance/usecases/vehicule/ListVehiculesUseCase";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";

export const listVehiculesUseCase: UseCaseImplementation<typeof paginatedRequest, ListVehiculesUseCase> = async (input) => {
    const useCase = createListVehiculesUseCase(vehiculeRepository)
    return useCase(input)
}