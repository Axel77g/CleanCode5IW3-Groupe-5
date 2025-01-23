import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { RegisterTestDriveEvent } from "@domain/testDrive/Events/RegisterTestDriveEvent";
import { DriverLicenseId } from "@domain/testDrive/value-object/DriverLicenseId";
import { Period } from "@domain/testDrive/value-object/Period";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { randomUUID } from "node:crypto";
import { DriverRepository } from "../../repositories/DriverRepository";

interface RegisterTestDriveInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    vehicleImmatriculation: VehiculeImmatriculation,
    period: Period
}

export type RegisterTestDriveUseCase = IUseCase<RegisterTestDriveInput, Result>

export const createRegisterTestDriveUseCase = (_eventRepository: EventRepository, _driverRepository: DriverRepository): RegisterTestDriveUseCase => {
    return async (input: RegisterTestDriveInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if (!driverResponse.success) return driverResponse
        const testDriveEvent = new RegisterTestDriveEvent({
            testDriveId: randomUUID(),
            driverLicenseId: input.driverLicenseId.getValue(),
            vehicleImmatriculation: input.vehicleImmatriculation.getValue(),
            periodStart: input.period.startDate,
            periodEnd: input.period.endDate
        })
        const storeResponse = await _eventRepository.storeEvent(testDriveEvent)
        if (!storeResponse.success) return storeResponse
        return Result.Success("Test Drive registered")
    }
}