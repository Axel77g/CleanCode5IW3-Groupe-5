import {IUseCase} from "../../../../shared/IUseCase";
import { PaginatedResult, Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
//@ts-ignore

export type ListDriversUseCase = IUseCase<PaginatedInput, PaginatedResult<Driver>>

export const listDriversUseCase = (_testDriveEventRegistry : TestDriveEventRepository): ListDriversUseCase => {
    return async (input: PaginatedInput) => {
        // const driversResponse = await _testDriveEventRegistry.getPaginatedEvents<DriverAggregate>('driver', _eventAggregateMapper, input)
        // if(!driversResponse.success) return Result.FailureStr("Cannot list drivers")
        const drivers = [] as Driver[]
        return Result.SuccessPaginated<Driver>(
            drivers,
            0,0,0
        )
    }
}