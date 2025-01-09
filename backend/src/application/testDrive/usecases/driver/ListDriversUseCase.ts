import {IUseCase} from "../../../../shared/IUseCase";
import { PaginatedResult, Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverRepository} from "../../repositories/DriverRepository";
//@ts-ignore

export type ListDriversUseCase = IUseCase<PaginatedInput, PaginatedResult<Driver>>

export const listDriversUseCase = (_driverRepository : DriverRepository): ListDriversUseCase => {
    return async (input: PaginatedInput) => {
        const driversResponse = await _driverRepository.listDrivers(input)
        if(!driversResponse.success) return Result.FailureStr("Cannot list drivers")
        return driversResponse
    }
}