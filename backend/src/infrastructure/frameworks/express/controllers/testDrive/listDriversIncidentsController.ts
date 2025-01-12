import {Controller} from "@expressApp/types/Controller";
import {paginatedWithDriverLicenseIdRequest} from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {Response} from "@expressApp/core/Response";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createListDriverIncidentsUseCase} from "@application/testDrive/usecases/incident/ListDriverIncidentsUseCase";
import {incidentRepository} from "@infrastructureCore/repositories/testDrive/incidentRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";

export const listDriversIncidentsController : Controller<typeof paginatedWithDriverLicenseIdRequest> = async (payload) => {
    const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
    if(driverLicenseId instanceof Error) return Response.Fail(400, driverLicenseId.message)
    const listDriverIncidentsUseCase = createListDriverIncidentsUseCase(incidentRepository, driverRepository)
    const result = await listDriverIncidentsUseCase({driverLicenseId, page: payload.page, limit: payload.limit})
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.SuccessPaginated(result.value, result.total, payload.page, payload.limit)
}