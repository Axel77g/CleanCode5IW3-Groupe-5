import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {IncidentType} from "../../../../domain/testDrive/enums/IncidentType";
import {Result} from "../../../../shared/Result";
import {IncidentRepository} from "../../repositories/IncidentRepository";
import {Incident} from "../../../../domain/testDrive/entities/Incident";
import {DriverRepository} from "../../repositories/DriverRepository";

interface RegisterIncidentInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    description: string;
    date: Date;
    type : IncidentType;
}

export type RegisterIncidentUseCase = IUseCase<RegisterIncidentInput, Result>

export const registerIncidentUseCase = (_incidentRepository: IncidentRepository, _driverRepository : DriverRepository): RegisterIncidentUseCase => {
    return async (input: RegisterIncidentInput) => {
        const driverResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return Result.Failure(driverResponse.error)
        const incident = new Incident(input.driverLicenseId, input.type, input.description, input.date)
        const storeResponse = await _incidentRepository.store(incident)
        if (!storeResponse.success) return Result.Failure(storeResponse.error)
        return Result.Success("Incident registered")
    }
}