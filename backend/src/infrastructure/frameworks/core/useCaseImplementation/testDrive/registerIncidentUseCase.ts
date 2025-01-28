import {
    createRegisterIncidentUseCase,
    RegisterIncidentUseCase
} from "@application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {registerIncidentRequest} from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const registerIncidentUseCase : UseCaseImplementation<typeof registerIncidentRequest, RegisterIncidentUseCase> = async (input) =>{
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const useCase = createRegisterIncidentUseCase(testDriveEventRepository,driverRepository)
    return useCase({
        driverLicenseId,
        description: input.description,
        date: input.date,
        type: input.type
    })
}