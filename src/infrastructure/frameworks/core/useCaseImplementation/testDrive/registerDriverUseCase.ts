import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {
    createRegisterDriverUseCase,
    RegisterDriverUseCase
} from "@application/testDrive/usecases/driver/RegisterDriverUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const registerDriverUseCase : UseCaseImplementation<typeof registerDriverRequest, RegisterDriverUseCase> = async (input)=>{
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const useCase = createRegisterDriverUseCase(testDriveEventRepository, driverRepository)
    return useCase({
        ...input,
        driverLicenseId
    })
}