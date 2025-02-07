import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {PaginatedInput} from "@shared/PaginatedInput";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";

interface ListVehiculeMaintenanceInput extends PaginatedInput {
    immatriculation: VehiculeImmatriculation
}

export type ListVehiculeMaintenanceUseCase = IUseCase<ListVehiculeMaintenanceInput, PaginatedResult<Maintenance>>

const ListVehiculeMaintenanceErrors = {
    VEHICULE_NOT_FOUND: NotFoundEntityException.create("Vehicule not found"),
    CANNOT_LIST_VEHICULE_MAINTENANCE: new ApplicationException("ListVehiculeMaintenance.CannotListVehiculeMaintenance", "Cannot list maintenance")
}

export const createListVehiculeMaintenanceUseCase = (_maintenanceRepository: MaintenanceRepository, _vehiculeRepository: VehiculeRepository): ListVehiculeMaintenanceUseCase => {
    return async (input: ListVehiculeMaintenanceInput) => {
        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.immatriculation)
        if (!vehiculeResponse.success) return vehiculeResponse
        if (vehiculeResponse.empty) return Result.Failure(ListVehiculeMaintenanceErrors.VEHICULE_NOT_FOUND)
        const maintenanceResponse = await _maintenanceRepository.listVehiculeMaintenance(input.immatriculation, input)
        if (!maintenanceResponse.success) return Result.Failure(ListVehiculeMaintenanceErrors.CANNOT_LIST_VEHICULE_MAINTENANCE)
        return maintenanceResponse
    }
}

