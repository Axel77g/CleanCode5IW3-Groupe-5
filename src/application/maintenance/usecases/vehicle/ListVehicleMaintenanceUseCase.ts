import {PaginatedResult, Result} from "@shared/Result";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";

interface ListVehicleMaintenanceInput extends PaginatedInput {
    vehicleImmatriculation: VehicleImmatriculation,
}

export type ListVehicleMaintenanceUseCase = IUseCase<ListVehicleMaintenanceInput, PaginatedResult<Maintenance>>

const ListVehicleMaintenanceErrors = {
    Vehicle_NOT_FOUND: NotFoundEntityException.create("Vehicle not found"),
    CANNOT_LIST_Vehicle_MAINTENANCES: new ApplicationException("ListVehicleMaintenance.CannotListVehicleMaintenances", "Cannot list maintenances")
}

export const createListVehicleMaintenanceUseCase = (_vehicleRepository: VehicleRepository, _maintenanceRepository: MaintenanceRepository): ListVehicleMaintenanceUseCase => {
    return async (input: ListVehicleMaintenanceInput) => {
        const vehicleResponse = await _vehicleRepository.getByImmatriculation(input.vehicleImmatriculation)
        if (!vehicleResponse.success) return vehicleResponse
        if (vehicleResponse.empty) return Result.Failure(ListVehicleMaintenanceErrors.Vehicle_NOT_FOUND)
        const maintenancesResponse = await _maintenanceRepository.listVehicleMaintenance(input.vehicleImmatriculation, input)
        if (!maintenancesResponse.success) return Result.Failure(ListVehicleMaintenanceErrors.CANNOT_LIST_Vehicle_MAINTENANCES)
        return maintenancesResponse
    }
}