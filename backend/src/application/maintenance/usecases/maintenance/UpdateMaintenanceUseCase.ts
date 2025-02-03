import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";

interface UpdateMaintenanceUseCaseInput extends IInputUseCase {
    maintenanceId: string,
    status: MaintenanceStatusEnum,
    recommendation: string,
}

export type UpdateMaintenanceUseCase = IUseCase<UpdateMaintenanceUseCaseInput, Result>;

const updateMaintenanceErrors = {
    NOT_FOUND_MAINTENANCE: new ApplicationException("UpdateMaintenanceUseCase.NotFoundMaintenance", "Cannot update maintenance record for not found maintenance"),
}

export const createUpdateMaintenanceUseCase = (_eventRepository: EventRepository, _maintenanceRepository: MaintenanceRepository): UpdateMaintenanceUseCase => {
    return async (input: UpdateMaintenanceUseCaseInput) => {
        const maintenance = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId);
        if (!maintenance.success) return maintenance;
        if (maintenance.empty) return Result.Failure(updateMaintenanceErrors.NOT_FOUND_MAINTENANCE);

        const updatedMaintenance = new UpdateMaintenanceEvent({
            maintenanceId: input.maintenanceId,
            status: input.status,
            recommendation: input.recommendation,
        })

        const repositoryResponse = await _eventRepository.storeEvent(updatedMaintenance);
        if (!repositoryResponse.success) return repositoryResponse;
        return Result.Success("Maintenance updated successfully");
    }
}