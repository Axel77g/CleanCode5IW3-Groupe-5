import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Period} from "@domain/testDrive/value-object/Period";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface RegisterTestDriveInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    vehicleImmatriculation : VehiculeImmatriculation,
    period : Period
}

export type RegisterTestDriveUseCase = IUseCase<RegisterTestDriveInput, Result>

const registerTestDriveErrors = {
    DRIVER_NOT_FOUND: NotFoundEntityException.create("Driver not found"),
}

export const createRegisterTestDriveUseCase = (_eventRepository: EventRepository, _driverRepository : DriverRepository): RegisterTestDriveUseCase => {
    return async (input: RegisterTestDriveInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(registerTestDriveErrors.DRIVER_NOT_FOUND)
        const testDrive = TestDrive.create({
            driverLicenseId: input.driverLicenseId,
            vehicleImmatriculation: input.vehicleImmatriculation,
            period: input.period
        })
        const storeResponse = await _eventRepository.storeEvent(testDrive.registerEvent())
        if (!storeResponse.success) return storeResponse
        return Result.Success("Test Drive registered")
    }
}