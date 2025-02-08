import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    assignVehicleBreakdownToMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/vehicleBreakdown/assignVehicleBreakdownToMaintenanceRequest";
import {
    AssignVehicleToMaintenanceUseCase, createAssignVehicleBreakdownToMaintenanceUseCase
} from "@application/maintenance/usecases/vehicleBreakdown/AssignVehicleBreakdownToMaintenanceUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";
import {vehicleBreakdownRepository} from "@infrastructureCore/repositories/maintenance/vehicleBreakdownRepository";

export const assignVehicleBreakdownToMaintenanceUseCase : UseCaseImplementation<typeof assignVehicleBreakdownToMaintenanceRequest, AssignVehicleToMaintenanceUseCase> = async (input) => {
    const useCase = createAssignVehicleBreakdownToMaintenanceUseCase(maintenanceEventRepository, vehicleBreakdownRepository, maintenanceRepository)
    return useCase({
        ...input
    })
}
