import { Siret } from "../../../../domain/shared/value-object/Siret";
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { GarageRepository } from "../../repositories/GarageRepository";

interface DeleteGarageInput extends IInputUseCase {
    siret: Siret,
}

export type DeleteGarageUseCase = IUseCase<DeleteGarageInput, Result>
export const deleteGarageUseCase = (_garageRepository: GarageRepository): DeleteGarageUseCase => {

    // @TODO : Add logic to delete the link with a Dealer if exist

    return async (input: DeleteGarageInput) => {
        const deleteResponse = await _garageRepository.delete(input.siret)
        if (!deleteResponse.success) return Result.FailureStr("Cannot delete garage")
        return Result.Success("Garage deleted")
    }
}