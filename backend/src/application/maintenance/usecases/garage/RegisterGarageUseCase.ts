import { GarageRepository } from '@application/maintenance/repositories/GarageRepository';
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from '@shared/IUseCase';
import { Result } from '@shared/Result';

interface RegisterGarageInput extends IInputUseCase {
    siret: Siret,
    name: string,
    phoneNumber: string,
}

export type RegisterGarageUseCase = IUseCase<RegisterGarageInput, Result>
export const registerGarageUseCAse = (_garageRepository: GarageRepository): RegisterGarageUseCase => {
    return async (input: RegisterGarageInput) => {
        // const garage = new Garage(
        //     input.siret,
        //     input.name,
        //     input.phoneNumber,
        // );
        // const storeResponse = await _garageRepository.store(garage);
        // if (!storeResponse.success) return Result.FailureStr("Cannot register garage");
        return Result.Success("Garage Registered");
    }
}