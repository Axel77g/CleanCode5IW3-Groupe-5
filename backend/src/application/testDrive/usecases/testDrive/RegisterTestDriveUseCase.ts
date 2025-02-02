import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Period} from "@domain/testDrive/value-object/Period";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {TestDriveRepository} from "@application/testDrive/repositories/TestDriveRepository";

interface RegisterTestDriveInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    vehicleImmatriculation : VehiculeImmatriculation,
    period : Period
}

export type RegisterTestDriveUseCase = IUseCase<RegisterTestDriveInput, Result>

const registerTestDriveErrors = {
    DRIVER_NOT_FOUND: NotFoundEntityException.create("Driver not found"),
    TEST_DRIVE_OVERLAP: new ApplicationException("registerTestDrive.TestDriveOverlap","Cannot register test drive, The vehicule is not available for this period")
}

export const createRegisterTestDriveUseCase = (_eventRepository: EventRepository, _driverRepository : DriverRepository, _testDriveRepository: TestDriveRepository): RegisterTestDriveUseCase => {
    return async (input: RegisterTestDriveInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(registerTestDriveErrors.DRIVER_NOT_FOUND)

        const vehiculeDisponibilitiesResponse = await _testDriveRepository.getVehiculeDisponibilities(input.vehicleImmatriculation)
        if(!vehiculeDisponibilitiesResponse.success) return vehiculeDisponibilitiesResponse
        if(!vehiculeDisponibilitiesResponse.value.isAvailable(input.period)) return Result.Failure(registerTestDriveErrors.TEST_DRIVE_OVERLAP)

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