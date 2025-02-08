import {showDriverRequest} from "@infrastructureCore/requests/testDrive/showDriverRequest";
import {createShowDriverUseCase, ShowDriverUseCase} from "@application/testDrive/usecases/driver/ShowDriverUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Result} from "@shared/Result";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const showDriverUseCase: UseCaseImplementation<typeof showDriverRequest, ShowDriverUseCase> = async (input)=>{
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof Error) return Result.Failure(driverLicenseId)
    const useCase = createShowDriverUseCase(driverRepository)
    return useCase({driverLicenseId})
}

