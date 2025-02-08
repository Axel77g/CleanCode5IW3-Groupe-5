import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {MaintenanceSparePart, MaintenanceSparePartDTO} from "@domain/maintenance/value-object/MaintenanceSparePart";
import {Siret} from "@domain/shared/value-object/Siret";

interface UpdateMaintenanceUseCaseInput extends IInputUseCase {
    garageSiret: Siret | null,
    maintenanceId: string,
    status: MaintenanceStatusEnum,
    recommendation: string,
    maintenanceSpareParts: MaintenanceSparePartDTO[]
}

export type UpdateMaintenanceUseCase = IUseCase<UpdateMaintenanceUseCaseInput, Result>;

const updateMaintenanceErrors = {
    NOT_FOUND_MAINTENANCE: new ApplicationException("UpdateMaintenanceUseCase.NotFoundMaintenance", "Cannot update maintenances record for not found maintenances"),
}

export const createUpdateMaintenanceUseCase = (_eventRepository: EventRepository, _maintenanceRepository: MaintenanceRepository): UpdateMaintenanceUseCase => {
    return async (input: UpdateMaintenanceUseCaseInput) => {
        const maintenance = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId);
        if (!maintenance.success) return maintenance;
        if (maintenance.empty) return Result.Failure(updateMaintenanceErrors.NOT_FOUND_MAINTENANCE);
        const maintenanceSparePart = input.maintenanceSpareParts.map(MaintenanceSparePart.createFormObject)
        if(maintenanceSparePart.some(sparePart => sparePart instanceof ApplicationException)) return Result.Failure(maintenanceSparePart.find(sparePart => sparePart instanceof ApplicationException) as ApplicationException);
        const updatedMaintenance = maintenance.value.update({
            garageSiret: input.garageSiret,
            status: input.status,
            recommendation: input.recommendation,
            maintenanceSpareParts: maintenanceSparePart as MaintenanceSparePart[]
        })
        const repositoryResponse = await _eventRepository.storeEvent(updatedMaintenance.updateEvent());
        if (!repositoryResponse.success) return repositoryResponse;
        return Result.Success("Maintenance updated successfully");
    }
}