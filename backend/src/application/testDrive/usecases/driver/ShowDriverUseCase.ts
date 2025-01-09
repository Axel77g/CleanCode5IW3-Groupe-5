import {Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {DriverRepository} from "../../repositories/DriverRepository";
import {ApplicationException} from "../../../../shared/ApplicationException";

interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}

export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<Driver>>

const ShowDriverErrors = {
    DRIVER_NOT_FOUND : new ApplicationException("ShowDriver.DriverNotFound", "Driver not found")
}

export const showDriverUseCase = (_driverRepository : DriverRepository) : ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        const findResponse = await _driverRepository.getByLicenseId(input.driverLicenseId.getValue())
        if(!findResponse.success) return Result.Failure(ShowDriverErrors.DRIVER_NOT_FOUND)
        return findResponse
    }
}