import {
    paginatedWithDriverLicenseIdRequest
} from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {
    createListDriverTestDrivesUseCase,
    ListDriverTestDrivesUseCase
} from "@application/testDrive/usecases/testDrive/ListDriverTestDrivesUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {testDriveRepository} from "@infrastructureCore/repositories/testDrive/testDriveRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const listDriverTestsDrivesUseCase : UseCaseImplementation<typeof paginatedWithDriverLicenseIdRequest, ListDriverTestDrivesUseCase> = async (input) => {
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const useCase = createListDriverTestDrivesUseCase(testDriveRepository, driverRepository)
    return useCase({driverLicenseId, page: input.page, limit: input.limit})
}