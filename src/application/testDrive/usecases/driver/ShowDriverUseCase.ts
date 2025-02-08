import {Result} from "@shared/Result";
import {Driver} from "@domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";

export interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}

export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<Driver>>

const ShowDriverErrors = {
    DRIVER_NOT_FOUND : NotFoundEntityException.create("Driver not found")
}

export const createShowDriverUseCase = (_driverRepository : DriverRepository) : ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        const findResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!findResponse.success) return findResponse
        if(findResponse.empty) return Result.Failure(ShowDriverErrors.DRIVER_NOT_FOUND)
        return findResponse
    }
}