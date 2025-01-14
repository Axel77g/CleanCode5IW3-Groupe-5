import { IncidentType } from "@domain/testDrive/enums/IncidentType";
import { RegisterIncidentEvent } from "@domain/testDrive/Events/RegisterIncidentEvent";
import { DriverLicenseId } from "@domain/testDrive/value-object/DriverLicenseId";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { randomUUID } from "node:crypto";
import { EventRepository } from "../../../shared/repositories/EventRepository";
import { DriverRepository } from "../../repositories/DriverRepository";

interface RegisterIncidentInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    description: string;
    date: Date;
    type: IncidentType;
}

export type RegisterIncidentUseCase = IUseCase<RegisterIncidentInput, Result>

export const createRegisterIncidentUseCase = (_eventRepository: EventRepository, _driverRepository: DriverRepository): RegisterIncidentUseCase => {
    return async (input: RegisterIncidentInput) => {
        console.log(input)
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if (!driverResponse.success) return driverResponse
        const registerIncidentEvent = new RegisterIncidentEvent({
            incidentId: randomUUID(),
            driverLicenseId: input.driverLicenseId.getValue(),
            description: input.description,
            type: input.type,
            date: input.date
        })
        const storeResponse = await _eventRepository.storeEvent(registerIncidentEvent)
        if (!storeResponse.success) return Result.Failure(storeResponse.error)
        return Result.Success("Incident registered")
    }
}

