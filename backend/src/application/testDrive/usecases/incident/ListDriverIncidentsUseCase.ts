import {IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {PaginatedResult, Result} from "../../../../shared/Result";
import {Incident} from "../../../../domain/testDrive/entities/Incident";
import {IncidentRepository} from "../../repositories/IncidentRepository";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {DriverRepository} from "../../repositories/DriverRepository";

interface ListDriverIncidentsInput extends PaginatedInput{
    driverLicenseId: DriverLicenseId,
}

export type ListDriverIncidentsUseCase = IUseCase<ListDriverIncidentsInput, PaginatedResult<Incident>>

export const listDriverIncidentsUseCase = (_incidentRepository : IncidentRepository, _driverRepository : DriverRepository): ListDriverIncidentsUseCase => {
    return async (input : ListDriverIncidentsInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return Result.Failure(driverResponse.error)
        const incidentsResponse = await _incidentRepository.listDriverIncidents(input.driverLicenseId, input)
        if(!incidentsResponse.success) return Result.FailureStr("Cannot list incidents")
        return incidentsResponse
    }
}