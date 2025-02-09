import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";
import {Garage} from "@domain/maintenance/entities/Garage";
import {Address} from "@domain/shared/value-object/Address";

interface RegisterGarageInput extends IInputUseCase {
    siret: Siret,
    name: string,
    address: Address,
    phoneNumber: string
}

export type RegisterGarageUseCase = IUseCase<RegisterGarageInput, Result>

export const createRegisterGarageUseCase = (_eventRepository: EventRepository, _garageRepository: GarageRepository): RegisterGarageUseCase => {
    return async (input: RegisterGarageInput) => {
        const existingGarageResponse = await _garageRepository.getBySiret(input.siret);
        if (!existingGarageResponse.success) return existingGarageResponse
        if (!existingGarageResponse.empty) return Result.FailureStr("Garage already exists with this siret")
        const garage = Garage.create(input)
        const storeResponse = await _eventRepository.storeEvent(garage.registerEvent());
        if (!storeResponse.success) return Result.FailureStr("Cannot register garage")
        return Result.Success("Garage registered")
    }
}