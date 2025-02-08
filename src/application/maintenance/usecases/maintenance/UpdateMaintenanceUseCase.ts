import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {MaintenanceSparePart, MaintenanceSparePartDTO} from "@domain/maintenance/value-object/MaintenanceSparePart";
import {Siret} from "@domain/shared/value-object/Siret";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";
import {
    CheckSparesPartsReferencesExistUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";

interface UpdateMaintenanceUseCaseInput extends IInputUseCase {
    maintenanceId: string,
    garageSiret ?: Siret | null,
    status ?: MaintenanceStatusEnum,
    recommendation ?: string,
    maintenanceSpareParts ?: MaintenanceSparePartDTO[]
}

export type UpdateMaintenanceUseCase = IUseCase<UpdateMaintenanceUseCaseInput, Result>;

const updateMaintenanceErrors = {
    NOT_FOUND_MAINTENANCE: NotFoundEntityException.create("Cannot update maintenances record for not found maintenances"),
    NOT_FOUND_GARAGE : NotFoundEntityException.create("Cannot update maintenances record for not found garages"),
    NOT_FOUND_REFERENCE : NotFoundEntityException.create("Cannot update maintenances record for not found references")
}

export const createUpdateMaintenanceUseCase = (_eventRepository: EventRepository, _maintenanceRepository: MaintenanceRepository, _garageRepository: GarageRepository, _checkSparesPartsReferencesExitUseCase : CheckSparesPartsReferencesExistUseCase): UpdateMaintenanceUseCase => {
    return async (input: UpdateMaintenanceUseCaseInput) => {
        const maintenanceResponse = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId);
        if (!maintenanceResponse.success) return maintenanceResponse;
        if (maintenanceResponse.empty) return Result.Failure(updateMaintenanceErrors.NOT_FOUND_MAINTENANCE);

        if(input.garageSiret) {
            const garageResponse = await _garageRepository.getBySiret(input.garageSiret)
            if (!garageResponse.success) return garageResponse;
            if (garageResponse.empty) return Result.Failure(updateMaintenanceErrors.NOT_FOUND_MAINTENANCE);
        }

        if(input.maintenanceSpareParts){
            const sparesPartsExistsResponse = await _checkSparesPartsReferencesExitUseCase({
                spareParts: input.maintenanceSpareParts
            });
            if(!sparesPartsExistsResponse.success) return sparesPartsExistsResponse;
            if(!sparesPartsExistsResponse.value) return Result.Failure(updateMaintenanceErrors.NOT_FOUND_REFERENCE);
        }

        const maintenanceSparePart = input.maintenanceSpareParts !== undefined ? input.maintenanceSpareParts.map(MaintenanceSparePart.createFormObject) : undefined
        if(maintenanceSparePart && maintenanceSparePart.some(sparePart => sparePart instanceof ApplicationException)) return Result.Failure(maintenanceSparePart.find(sparePart => sparePart instanceof ApplicationException) as ApplicationException);
        const updatedMaintenance = maintenanceResponse.value.update({
            garageSiret: input.garageSiret,
            status: input.status,
            recommendation: input.recommendation,
            maintenanceSpareParts: maintenanceSparePart as MaintenanceSparePart[] | undefined
        })
        const repositoryResponse = await _eventRepository.storeEvent(updatedMaintenance.updateEvent());
        if (!repositoryResponse.success) return repositoryResponse;
        return Result.Success("Maintenance updated successfully");
    }
}