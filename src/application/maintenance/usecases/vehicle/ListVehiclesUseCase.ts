import {PaginatedResult, Result} from "@shared/Result";
import {Vehicle} from "@domain/maintenance/entities/Vehicle";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {ApplicationException} from "@shared/ApplicationException";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";

export type ListVehiclesUseCase = IUseCase<PaginatedInput, PaginatedResult<Vehicle>>

const listVehiclesErrors = {
    CANNOT_LIST_VehicleS: new ApplicationException("ListVehiclesUseCase.CannotListVehicles", "Cannot list vehicles")
}

export const createListVehiclesUseCase = (_vehicleRepository: VehicleRepository): ListVehiclesUseCase => {
    return async (input: PaginatedInput) => {
        const vehiclesResponse = await _vehicleRepository.listVehicles(input);
        if (!vehiclesResponse.success) return Result.Failure(listVehiclesErrors.CANNOT_LIST_VehicleS);
        return vehiclesResponse;
    };
}