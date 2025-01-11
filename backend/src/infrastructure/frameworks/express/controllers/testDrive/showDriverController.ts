import {Controller} from "@expressApp/types/Controller";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Response} from "@expressApp/core/Response";
import {createShowDriverUseCase} from "@application/testDrive/usecases/driver/ShowDriverUseCase";
import {showDriverRequest} from "@expressApp/requests/testDrive/showDriverRequest";
import {driverRepository} from "@expressApp/repositories/testDrive/driverRepository";

export const showDriverController : Controller<typeof showDriverRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)
    const registerDriverUseCase = createShowDriverUseCase(driverRepository)
    const result = await registerDriverUseCase({ driverLicenseId })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}