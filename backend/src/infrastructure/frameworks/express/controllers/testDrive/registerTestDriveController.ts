import {Controller} from "@expressApp/types/Controller";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {Response} from "@expressApp/core/Response";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {VehicleImmatriculation} from "@domain/shared/value-object/VehicleImmatriculation";
import {Period} from "@domain/testDrive/value-object/Period";
import {createRegisterTestDriveUseCase} from "@application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";

export const registerTestDriveController : Controller<typeof registerTestDriveRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)
    const vehicleImmatriculation = VehicleImmatriculation.create(payload.vehicleImmatriculation)
    if(vehicleImmatriculation instanceof Error) return Response.Fail(400, vehicleImmatriculation.message)
    const period = Period.create(payload.period.startDate, payload.period.endDate)
    if(period instanceof Error) return Response.Fail(400, period.message)
    const registerTestDriveUseCase = createRegisterTestDriveUseCase(testDriveEventRepository,driverRepository)
    const result = await registerTestDriveUseCase({
        driverLicenseId,
        vehicleImmatriculation,
        period
    })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}