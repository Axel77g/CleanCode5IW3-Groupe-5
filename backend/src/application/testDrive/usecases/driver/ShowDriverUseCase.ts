import {Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {DriverRepository} from "../../repositories/DriverRepository";

interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}

export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<Driver>>

export const showDriverUseCase = (_driverRepository : DriverRepository) : ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        const findResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!findResponse.success) return Result.FailureStr("Driver not found")
        return findResponse
    }
}