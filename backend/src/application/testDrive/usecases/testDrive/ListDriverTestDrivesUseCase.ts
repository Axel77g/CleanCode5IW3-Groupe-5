import {PaginatedInput} from "@shared/PaginatedInput";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {TestDriveRepository} from "@application/testDrive/repositories/TestDriveRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";

interface ListDriverTestDrivesInput extends PaginatedInput{
    driverLicenseId: DriverLicenseId,
}

export type ListDriverTestDrivesUseCase = IUseCase<ListDriverTestDrivesInput, PaginatedResult<TestDrive>>

const ListDriverTestDrivesErrors = {
    DRIVER_NOT_FOUND :  NotFoundEntityException.create("Driver not found"),
    CANNOT_LIST_DRIVERS_TEST_DRIVES : new ApplicationException("ListDriverTestDrives.CannotListDriverTestDrives", "Cannot list test drives")
}

export const createListDriverTestDrivesUseCase = (_testDriveRepository : TestDriveRepository, _driverRepository : DriverRepository): ListDriverTestDrivesUseCase => {
    return async (input : ListDriverTestDrivesInput) => {
         const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
         if(!driverResponse.success) return driverResponse
         if(driverResponse.empty) return Result.Failure(ListDriverTestDrivesErrors.DRIVER_NOT_FOUND)
         const testDrivesResponse = await _testDriveRepository.listDriverTestDrives(input.driverLicenseId, input)
         if(!testDrivesResponse.success) return Result.Failure(ListDriverTestDrivesErrors.CANNOT_LIST_DRIVERS_TEST_DRIVES)
         return testDrivesResponse
    }
}
