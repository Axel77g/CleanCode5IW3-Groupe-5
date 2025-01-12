import {Controller} from "@expressApp/types/Controller";
import {paginatedWithDriverLicenseIdRequest} from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {testDriveRepository} from "@infrastructureCore/repositories/testDrive/testDriveRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {createListDriverTestDrivesUseCase} from "@application/testDrive/usecases/testDrive/ListDriverTestDrivesUseCase";
import {Response} from "@expressApp/core/Response";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";

export const listDriverTestsDrivesController : Controller<typeof paginatedWithDriverLicenseIdRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)
    const listDriverTestDrivesUseCase = createListDriverTestDrivesUseCase(testDriveRepository,driverRepository)
    const result = await listDriverTestDrivesUseCase({
        driverLicenseId,
        page: payload.page,
        limit: payload.limit
    })
    console.log(result)
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.SuccessPaginated(result.value, result.total, payload.page, payload.limit)
}