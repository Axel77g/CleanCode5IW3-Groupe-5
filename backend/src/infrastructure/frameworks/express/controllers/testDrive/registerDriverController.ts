import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {
    createRegisterDriverUseCase,
    RegisterDriverInput
} from "@application/testDrive/usecases/driver/RegisterDriverUseCase";
import {Controller} from "../../types/Controller";
import {Response} from "../../core/Response";
import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";

export const registerDriverController : Controller<typeof registerDriverRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)

    const registerDriverUseCase = createRegisterDriverUseCase(testDriveEventRepository, driverRepository)
    const input : RegisterDriverInput = {
        ...payload,
        driverLicenseId
    }
    const result = await registerDriverUseCase(input)
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}