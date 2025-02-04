import {createListGarageUseCase, ListGarageUseCase} from "@application/maintenance/usecases/garage/ListGarageUseCase";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";

export const listGarageUseCase : UseCaseImplementation<typeof paginatedRequest, ListGarageUseCase>  = async (input) => {
    const useCase = createListGarageUseCase(garageRepository)
    return useCase(input)
}