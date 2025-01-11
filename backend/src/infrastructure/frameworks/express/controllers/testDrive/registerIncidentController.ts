import {Controller} from "@expressApp/types/Controller";
import {registerIncidentRequest} from "@expressApp/requests/testDrive/registerIncidentRequest";
import {Response} from "@expressApp/core/Response";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createRegisterIncidentUseCase} from "@application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {testDriveEventRepository} from "@expressApp/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@expressApp/repositories/testDrive/driverRepository";

export const registerIncidentController : Controller<typeof registerIncidentRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)
    const registerIncidentUseCase = createRegisterIncidentUseCase(testDriveEventRepository,driverRepository)
    const result = await registerIncidentUseCase({
        driverLicenseId,
        description: payload.description,
        date: payload.date,
        type: payload.type
    })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Fail(400, "Not implemented yet")
}