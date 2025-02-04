import {PaginatedResult, Result} from "@shared/Result";
import {Vehicule} from "@domain/maintenance/entities/Vehicule";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedInput} from "@shared/PaginatedInput";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";

export type ListVehiculesUseCase = IUseCase<PaginatedInput, PaginatedResult<Vehicule>>

const listVehiculesErrors = {
    CANNOT_LIST_VEHICULES: new ApplicationException("ListVehiculesUseCase.CannotListVehicules", "Cannot list vehicules")
}

export const createListVehiculesUseCase = (_vehiculeRepository: VehiculeRepository): ListVehiculesUseCase => {
    return async (input: PaginatedInput) => {
        const vehiculesResponse = await _vehiculeRepository.listVehicules(input);
        if (!vehiculesResponse.success) return Result.Failure(listVehiculesErrors.CANNOT_LIST_VEHICULES);
        return vehiculesResponse;
    };
}