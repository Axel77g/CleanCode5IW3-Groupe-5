import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createShowMaintenanceUseCase,
    ShowMaintenanceUseCase
} from "@application/maintenance/usecases/maintenance/ShowMaintenanceUseCase";
import {showMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/showMaintenanceRequest";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";

export const showMaintenanceUseCase: UseCaseImplementation<typeof showMaintenanceRequest, ShowMaintenanceUseCase> = async (input) => {
    const useCase = createShowMaintenanceUseCase(maintenanceRepository)
    return useCase(input)
}