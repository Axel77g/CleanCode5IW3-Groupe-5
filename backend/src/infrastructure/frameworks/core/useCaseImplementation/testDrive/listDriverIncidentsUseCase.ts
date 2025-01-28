import {
    paginatedWithDriverLicenseIdRequest
} from "@infrastructureCore/requests/testDrive/paginatedWithDriverLicenseIdRequest";
import {
    createListDriverIncidentsUseCase,
    ListDriverIncidentsUseCase
} from "@application/testDrive/usecases/incident/ListDriverIncidentsUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {incidentRepository} from "@infrastructureCore/repositories/testDrive/incidentRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";

export const listDriverIncidentsUseCase : UseCaseImplementation<typeof paginatedWithDriverLicenseIdRequest, ListDriverIncidentsUseCase> = async (input) => {
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId)
    if(driverLicenseId instanceof ApplicationException) return Result.Failure(driverLicenseId)
    const useCase = createListDriverIncidentsUseCase(incidentRepository, driverRepository)
    return useCase({driverLicenseId, page: input.page, limit: input.limit})
}