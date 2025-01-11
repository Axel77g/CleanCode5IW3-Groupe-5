import {PaginatedInput} from "@shared/PaginatedInput";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {TestDriveRepository} from "../../repositories/TestDriveRepository";
import {DriverRepository} from "../../repositories/DriverRepository";
import {ApplicationException} from "@shared/ApplicationException";

interface ListDriverTestDrivesInput extends PaginatedInput{
    driverLicenseId: DriverLicenseId,
}

export type ListDriverTestDrivesUseCase = IUseCase<ListDriverTestDrivesInput, PaginatedResult<TestDrive>>

const ListDriverTestDrivesErrors = {
    DRIVER_NOT_FOUND : new ApplicationException("ListDriverTestDrives.CannotListDriverTestDrives", "Cannot list test drives")
}

export const createListDriverTestDrivesUseCase = (_testDriveRepository : TestDriveRepository, _driverRepository : DriverRepository): ListDriverTestDrivesUseCase => {
    return async (input : ListDriverTestDrivesInput) => {
         const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
         if(!driverResponse.success) return Result.Failure(driverResponse.error)
         const testDrivesResponse = await _testDriveRepository.listDriverTestDrives(input.driverLicenseId, input)
         if(!testDrivesResponse.success) return Result.Failure(ListDriverTestDrivesErrors.DRIVER_NOT_FOUND)
         return testDrivesResponse
    }
}
