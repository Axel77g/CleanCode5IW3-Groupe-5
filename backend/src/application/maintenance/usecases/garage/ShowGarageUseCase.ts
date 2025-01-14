import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { Garage } from "@domain/maintenance/entities/Garage";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface ShowGarageInput extends IInputUseCase {
    siret: Siret
}

type ShowGarageResult = Result<Garage>
export type ShowGarageUseCase = IUseCase<ShowGarageInput, ShowGarageResult>
export const createShowGarageUseCase = (_garageRepository: GarageRepository): ShowGarageUseCase => {
    return async (input: ShowGarageInput) => {
        const findResponse = await _garageRepository.show(input.siret);
        if (!findResponse.success) return Result.FailureStr("Garage not found")
        return findResponse
    }
}
