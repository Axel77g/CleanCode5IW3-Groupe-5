import {IUseCase} from "../../../../shared/IUseCase";
import { PaginatedResult, Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverRepository} from "../../repositories/DriverRepository";
import {ApplicationException} from "../../../../shared/ApplicationException";
//@ts-ignore

export type ListDriversUseCase = IUseCase<PaginatedInput, PaginatedResult<Driver>>

const listDriversErrors = {
    CANNOT_LIST_DRIVERS : new ApplicationException("ListDriversUseCase.CannotListDrivers", "Cannot list drivers")
}

export const listDriversUseCase = (_driverRepository : DriverRepository): ListDriversUseCase => {
    return async (input: PaginatedInput) => {
        const driversResponse = await _driverRepository.listDrivers(input)
        if(!driversResponse.success) return Result.Failure(listDriversErrors.CANNOT_LIST_DRIVERS)
        return driversResponse
    }
}