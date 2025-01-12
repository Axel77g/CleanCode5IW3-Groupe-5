import {Controller} from "@expressApp/types/Controller";
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Response} from "@expressApp/core/Response";
import {createPatchDriverUseCase} from "@application/testDrive/usecases/driver/PatchDriverUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";

export const patchDriverController : Controller<typeof patchDriverRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)

    const patchDriverUseCase = createPatchDriverUseCase(testDriveEventRepository)
    const result = await patchDriverUseCase({
        driverLicenseId,
        driver: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email
        }
    })

    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}