import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {Result} from "../../../../shared/Result";
import {DriverRepository} from "../../repositories/DriverRepository";
import {VehicleImmatriculation} from "../../../../domain/shared/value-object/VehicleImmatriculation";
import {Period} from "../../../../domain/testDrive/value-object/Period";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {RegisterTestDriveEvent} from "../../../../domain/testDrive/Events/RegisterTestDriveEvent";
import {randomUUID} from "node:crypto";

interface RegisterTestDriveInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    vehicleImmatriculation : VehicleImmatriculation,
    period : Period
}

export type RegisterTestDriveUseCase = IUseCase<RegisterTestDriveInput, Result>

export const registerTestDriveUseCase = (_eventRepository: EventRepository, _driverRepository : DriverRepository): RegisterTestDriveUseCase => {
    return async (input: RegisterTestDriveInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!driverResponse.success) return driverResponse
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