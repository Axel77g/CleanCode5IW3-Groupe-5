import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {Result} from "../../../../shared/Result";
import {DriverRepository} from "../../repositories/DriverRepository";
import {TestDriveRepository} from "../../repositories/TestDriveRepository";
import {TestDrive} from "../../../../domain/testDrive/entities/TestDrive";
import {VehicleImmatriculation} from "../../../../domain/shared/value-object/VehicleImmatriculation";
import {Period} from "../../../../domain/testDrive/value-object/Period";

interface RegisterTestDriveInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    vehicleImmatriculation : VehicleImmatriculation,
    period : Period
}

export type RegisterTestDriveUseCase = IUseCase<RegisterTestDriveInput, Result>

export const registerTestDriveUseCase = (_testDriveRepository: TestDriveRepository, _driverRepository : DriverRepository): RegisterTestDriveUseCase => {
    return async (input: RegisterTestDriveInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return Result.Failure(driverResponse.error)
        const testDrive = new TestDrive(input.driverLicenseId, input.vehicleImmatriculation, input.period)
        const storeResponse = await _testDriveRepository.store(testDrive)
        if (!storeResponse.success) return Result.Failure(storeResponse.error)
        return Result.Success("Test Drive registered")
    }
}