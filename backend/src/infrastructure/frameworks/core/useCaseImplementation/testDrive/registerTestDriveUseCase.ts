import {
    createRegisterTestDriveUseCase,
    RegisterTestDriveUseCase
} from "@application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {Result} from "@shared/Result";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {testDriveRepository} from "@infrastructureCore/repositories/testDrive/testDriveRepository";

export const registerTestDriveUseCase : UseCaseImplementation<typeof registerTestDriveRequest, RegisterTestDriveUseCase> = async (input)=>{
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if (driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const vehicleImmatriculation = VehiculeImmatriculation.create(input.vehicleImmatriculation)
    if (vehicleImmatriculation instanceof ApplicationException) return Result.Failure(vehicleImmatriculation)
    const period = Period.create(input.period.startDate, input.period.endDate)
    if (period instanceof ApplicationException) return Result.Failure(period)
    const useCase = createRegisterTestDriveUseCase(testDriveEventRepository, driverRepository, testDriveRepository)
    return useCase({
        driverLicenseId,
        vehicleImmatriculation,
        period
    })
}