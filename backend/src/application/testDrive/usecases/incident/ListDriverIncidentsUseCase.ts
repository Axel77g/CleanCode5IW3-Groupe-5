import {IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedResult, Result} from "@shared/Result";
import {Incident} from "@domain/testDrive/entities/Incident";
import {IncidentRepository} from "../../repositories/IncidentRepository";
import {PaginatedInput} from "@shared/PaginatedInput";
import {DriverRepository} from "../../repositories/DriverRepository";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";

interface ListDriverIncidentsInput extends PaginatedInput{
    driverLicenseId: DriverLicenseId,
}

export type ListDriverIncidentsUseCase = IUseCase<ListDriverIncidentsInput, PaginatedResult<Incident>>

const ListDriverIncidentsErrors = {
    DRIVER_NOT_FOUND : NotFoundEntityException.create("Driver not found"),
    CANNOT_LIST_DRIVERS_INCIDENTS: new ApplicationException("ListDriverIncidents.CannotListDriverIncidents", "Cannot list incidents")
}

export const createListDriverIncidentsUseCase = (_incidentRepository : IncidentRepository, _driverRepository : DriverRepository): ListDriverIncidentsUseCase => {
    return async (input : ListDriverIncidentsInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(ListDriverIncidentsErrors.DRIVER_NOT_FOUND)
        const incidentsResponse = await _incidentRepository.listDriverIncidents(input.driverLicenseId, input)
        if(!incidentsResponse.success) return Result.Failure(ListDriverIncidentsErrors.CANNOT_LIST_DRIVERS_INCIDENTS)
        return incidentsResponse
    }
}