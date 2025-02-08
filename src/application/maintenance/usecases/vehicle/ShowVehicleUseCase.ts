import { VehicleRepository } from "@application/maintenance/repositories/VehicleRepository";
import { Vehicle } from "@domain/maintenance/entities/Vehicle";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";

interface ShowVehicleInput extends IInputUseCase {
    immatriculation: VehicleImmatriculation
}

type ShowVehicleResult = Result<Vehicle>
export type ShowVehicleUseCase = IUseCase<ShowVehicleInput, ShowVehicleResult>
export const createShowVehicleUseCase = (_vehicleRepository: VehicleRepository): ShowVehicleUseCase => {
    return async (input: ShowVehicleInput) => {
        const findResponse = await _vehicleRepository.getByImmatriculation(input.immatriculation);
        if (!findResponse.success) return findResponse
        if (findResponse.empty) return Result.Failure(NotFoundEntityException.create("Vehicle not found"))
        return findResponse
    }
}