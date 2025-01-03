import {Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {DriverRepository} from "../../repositories/DriverRepository";
import {DriverDocumentsRepository} from "../../repositories/DriverDocumentsRepository";
import {DriverDocuments} from "../../../../domain/testDrive/entities/DriverDocuments";

interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}

interface ShowDriverOutput {
    driver: Driver
    documents: DriverDocuments[]
}

export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<ShowDriverOutput>>

export const showDriverUseCase = (_driverRepository: DriverRepository, _driverDocumentRepository : DriverDocumentsRepository): ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        const findResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!findResponse.success) return Result.FailureStr("Driver not found")
        const findDocumentsResponse = await _driverDocumentRepository.showDriverDocuments(input.driverLicenseId)
        if(!findDocumentsResponse.success) return Result.FailureStr("Driver documents not found")
        return Result.Success<ShowDriverOutput>({
            driver: findResponse.value,
            documents: findDocumentsResponse.value
        })
    }
}