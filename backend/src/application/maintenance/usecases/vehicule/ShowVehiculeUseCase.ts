import { VehiculeRepository } from "@application/maintenance/repositories/VehiculeRepository";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";

interface ShowVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation
}

type ShowVehiculeResult = Result<Vehicule>
export type ShowVehiculeUseCase = IUseCase<ShowVehiculeInput, ShowVehiculeResult>
export const createShowVehiculeUseCase = (_vehiculeRepository: VehiculeRepository): ShowVehiculeUseCase => {
    return async (input: ShowVehiculeInput) => {
        const findResponse = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!findResponse.success) return findResponse
        if (findResponse.empty) return Result.Failure(NotFoundEntityException.create("Vehicule not found"))
        return findResponse
    }
}