import {createPatchDriverUseCase, PatchDriverUseCase} from "@application/testDrive/usecases/driver/PatchDriverUseCase";
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const patchDriverUseCase : UseCaseImplementation<typeof patchDriverRequest, PatchDriverUseCase> = async (input)=>{
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const useCase = createPatchDriverUseCase(testDriveEventRepository, driverRepository)
    return useCase({
        driverLicenseId,
        driver: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email
        }
    })
}