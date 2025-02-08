import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {ApplicationException} from "@shared/ApplicationException";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";

export type ListMaintenanceUseCase = IUseCase<PaginatedInput, PaginatedResult<Maintenance>>

const listMaintenanceErrors = {
    CANNOT_LIST_MAINTENANCES : new ApplicationException("ListMaintenanceUseCase.CannotListMaintenances", "Cannot list maintenances")
}

export const createListMaintenanceUseCase = (_maintenanceRepository : MaintenanceRepository): ListMaintenanceUseCase => {
    return async (input: PaginatedInput) => {
        const maintenancesResponse = await _maintenanceRepository.listMaintenance(input)
        if(!maintenancesResponse.success) return Result.Failure(listMaintenanceErrors.CANNOT_LIST_MAINTENANCES)
        return maintenancesResponse
    }
}

