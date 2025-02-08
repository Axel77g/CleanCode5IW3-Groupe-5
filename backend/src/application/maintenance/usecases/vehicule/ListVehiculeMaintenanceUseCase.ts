import {PaginatedResult, Result} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";

interface ListVehiculeMaintenanceInput extends PaginatedInput {
    vehiculeImmatriculation: VehiculeImmatriculation,
}

export type ListVehiculeMaintenanceUseCase = IUseCase<ListVehiculeMaintenanceInput, PaginatedResult<Maintenance>>

const ListVehiculeMaintenanceErrors = {
    VEHICULE_NOT_FOUND: NotFoundEntityException.create("Vehicule not found"),
    CANNOT_LIST_VEHICULE_MAINTENANCES: new ApplicationException("ListVehiculeMaintenance.CannotListVehiculeMaintenances", "Cannot list maintenances")
}

export const createListVehiculeMaintenanceUseCase = (_vehiculeRepository: VehiculeRepository, _maintenanceRepository: MaintenanceRepository): ListVehiculeMaintenanceUseCase => {
    return async (input: ListVehiculeMaintenanceInput) => {
        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.vehiculeImmatriculation)
        if (!vehiculeResponse.success) return vehiculeResponse
        if (vehiculeResponse.empty) return Result.Failure(ListVehiculeMaintenanceErrors.VEHICULE_NOT_FOUND)
        const maintenancesResponse = await _maintenanceRepository.listVehiculeMaintenance(input.vehiculeImmatriculation, input)
        if (!maintenancesResponse.success) return Result.Failure(ListVehiculeMaintenanceErrors.CANNOT_LIST_VEHICULE_MAINTENANCES)
        return maintenancesResponse
    }
}