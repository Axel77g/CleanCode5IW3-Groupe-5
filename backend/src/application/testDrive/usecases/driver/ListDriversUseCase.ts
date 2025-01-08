import {IUseCase} from "../../../../shared/IUseCase";
import { PaginatedResult, Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverAggregate} from "../../../../domain/testDrive/aggregate/DriverAggregate";
import {EventAggregateMapper} from "../../EventAggregateMapper";


export type ListDriversUseCase = IUseCase<PaginatedInput, PaginatedResult<Driver>>

export const listDriversUseCase = (_testDriveEventRegistry : TestDriveEventRepository, _eventAggregateMapper : EventAggregateMapper<DriverAggregate>): ListDriversUseCase => {
    return async (input: PaginatedInput) => {
        const driversResponse = await _testDriveEventRegistry.getPaginatedEvents<DriverAggregate>('driver', _eventAggregateMapper, input)
        if(!driversResponse.success) return Result.FailureStr("Cannot list drivers")
        const drivers = driversResponse.value
            .map(driverAggregate => driverAggregate.aggregate())
            .filter(driver => driver !== null) as Driver[]
        return Result.SuccessPaginated<Driver>(
            drivers,
            driversResponse.total,
            driversResponse.page,
            driversResponse.limit
        )
    }
}