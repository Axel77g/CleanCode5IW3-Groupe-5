import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    assignVehiculeBreakdownToMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/assignVehiculeBreakdownToMaintenanceRequest";
import {
    AssignVehiculeToMaintenanceUseCase, createAssignVehiculeBreakdownToMaintenanceUseCase
} from "@application/maintenance/usecases/vehiculeBreakdown/AssignVehiculeBreakdownToMaintenanceUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";
import {vehiculeBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehiculeBreakdownRepository";

export const assignVehiculeBreakdownToMaintenanceUseCase : UseCaseImplementation<typeof assignVehiculeBreakdownToMaintenanceRequest, AssignVehiculeToMaintenanceUseCase> = async (input) => {
    const useCase = createAssignVehiculeBreakdownToMaintenanceUseCase(maintenanceEventRepository, vehiculeBreakdownRepository, maintenanceRepository)
    return useCase({
        ...input
    })
}
