import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {IncidentType} from "@domain/testDrive/enums/IncidentType";
import {Result} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {Incident} from "@domain/testDrive/entities/Incident";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";

interface RegisterIncidentInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    description: string;
    date: Date;
    type : IncidentType;
}

export type RegisterIncidentUseCase = IUseCase<RegisterIncidentInput, Result>

const registerIncidentErrors = {
    DRIVER_NOT_FOUND: NotFoundEntityException.create("Driver not found"),
}

export const createRegisterIncidentUseCase = (_eventRepository: EventRepository, _driverRepository : DriverRepository): RegisterIncidentUseCase => {
    return async (input: RegisterIncidentInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(registerIncidentErrors.DRIVER_NOT_FOUND)
        const incident = Incident.create(input)
        if(incident instanceof ApplicationException) return Result.Failure(incident)
        const storeResponse = await _eventRepository.storeEvent(incident.registerEvent())
        if (!storeResponse.success) return storeResponse
        return Result.Success("Incident registered")
    }
}

