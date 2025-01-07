import { Garage } from "../../../../domain/maintenance/entities/Garage";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { GarageRepository } from "../../maintenance/GarageRepository";

interface ShowGarageInput extends IInputUseCase {
    siret: Siret
}

type ShowGarageResult = Result<Garage>
export type ShowGarageUseCase = IUseCase<ShowGarageInput, ShowGarageResult>
export const showGarageUseCase = (_garageRepository: GarageRepository): ShowGarageUseCase => {
    return async (input: ShowGarageInput) => {
        const findResponse = await _garageRepository.getBySiret(input.siret);
        if (!findResponse.success) return Result.FailureStr("Garage not found")
        return findResponse
    }
}
