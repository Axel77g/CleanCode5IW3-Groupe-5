import { EventRepository } from '@application/shared/repositories/EventRepository';
import { RegisterGarageEvent } from '@domain/maintenance/events/garage/RegisterGarageEvent';
import { Address } from '@domain/shared/value-object/Address';
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from '@shared/IUseCase';
import { Result } from '@shared/Result';

interface RegisterGarageInput extends IInputUseCase {
    siret: Siret,
    name: string,
    phoneNumber: string,
    address: Address,
}

export type RegisterGarageUseCase = IUseCase<RegisterGarageInput, Result>
export const createRegisterGarageUseCase = (_eventRepository: EventRepository): RegisterGarageUseCase => {
    return async (input: RegisterGarageInput) => {
        const registerGarageEvent = new RegisterGarageEvent({
            siret: input.siret.getValue(),
            name: input.name,
            phoneNumber: input.phoneNumber,
            address: input.address
        })
        const storeResponse = await _eventRepository.storeEvent(registerGarageEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot register garage")
        return Result.Success('Garage registered')
    }
}