import {PaginatedInput} from "@shared/PaginatedInput";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {PaginatedResult, Result} from "@shared/Result";
import {IUseCase} from "@shared/IUseCase";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";
import {Siret} from "@domain/shared/value-object/Siret";

interface ListGarageMaintenancesUseCase extends PaginatedInput{
    garageSiret: Siret,
}

export type ListGarageMaintenanceUseCase = IUseCase<ListGarageMaintenancesUseCase, PaginatedResult<Maintenance>>

const ListGarageMaintenanceErrors = {
    GARAGE_NOT_FOUND : NotFoundEntityException.create("Garage not found"),
    CANNOT_LIST_GARAGE_MAINTENANCE: new ApplicationException("ListGarageMaintenance.CannotListGarageMaintenance", "Cannot list maintenances")
}

export const createListGarageMaintenancesUseCase = (_maintenanceRepository : MaintenanceRepository, _garageRepository : GarageRepository): ListGarageMaintenanceUseCase => {
    return async (input : ListGarageMaintenancesUseCase) => {
        const garageResponse = await _garageRepository.getBySiret(input.garageSiret)
        if(!garageResponse.success) return garageResponse
        if(garageResponse.empty) return Result.Failure(ListGarageMaintenanceErrors.GARAGE_NOT_FOUND)
        const maintenancesResponse = await _maintenanceRepository.listGarageMaintenances(input.garageSiret, input)
        if(!maintenancesResponse.success) return Result.Failure(ListGarageMaintenanceErrors.CANNOT_LIST_GARAGE_MAINTENANCE)
        return maintenancesResponse
    }
}