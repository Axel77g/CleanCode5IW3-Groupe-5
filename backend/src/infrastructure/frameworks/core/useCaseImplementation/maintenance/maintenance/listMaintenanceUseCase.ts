import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {paginatedRequest} from "@infrastructureCore/requests/paginatedRequest";
import {createListMaintenanceUseCase,ListMaintenanceUseCase} from "@application/maintenance/usecases/maintenance/ListMaintenanceUseCase";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";

export const listMaintenanceUseCase: UseCaseImplementation<typeof paginatedRequest, ListMaintenanceUseCase> = async (input) => {
    const useCase = createListMaintenanceUseCase(maintenanceRepository)
    return useCase(input)
}