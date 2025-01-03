import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {IUseCase} from "../../../../shared/IUseCase";
import {PaginatedResult, Result} from "../../../../shared/Result";
import {TestDrive} from "../../../../domain/testDrive/entities/TestDrive";
import {TestDriveRepository} from "../../repositories/TestDriveRepository";
import {DriverRepository} from "../../repositories/DriverRepository";

interface ListDriverTestDrivesInput extends PaginatedInput{
    driverLicenseId: DriverLicenseId,
}

export type ListDriverTestDrivesUseCase = IUseCase<ListDriverTestDrivesInput, PaginatedResult<TestDrive>>

export const listDriverTestDrivesUseCase = (_testDriveRepository : TestDriveRepository, _driverRepository : DriverRepository): ListDriverTestDrivesUseCase => {
    return async (input : ListDriverTestDrivesInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return Result.Failure(driverResponse.error)
        const testDrivesResponse = await _testDriveRepository.listDriverTestDrives(input.driverLicenseId, input)
        if(!testDrivesResponse.success) return Result.FailureStr("Cannot list test drives")
        return testDrivesResponse
    }
}