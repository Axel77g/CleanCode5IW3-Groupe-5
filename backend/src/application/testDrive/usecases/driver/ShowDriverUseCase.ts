import {Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {DriverRepository} from "../../repositories/DriverRepository";
import {DriverDocumentsRepository} from "../../repositories/DriverDocumentsRepository";
import {DriverDocuments} from "../../../../domain/testDrive/value-object/DriverDocuments";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverAggregate} from "../../../../domain/testDrive/aggregate/DriverAggregate";
import {EventAggregateMapper} from "../../EventAggregateMapper";

interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}



export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<Driver>>

export const showDriverUseCase = (_testDriveEventRepository : TestDriveEventRepository, _eventAggregateMapper : EventAggregateMapper<DriverAggregate>): ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        const findResponse = await _testDriveEventRepository.getEvents<DriverAggregate>('driver-' + input.driverLicenseId.getValue(), _eventAggregateMapper)
        if(!findResponse.success) return Result.FailureStr("Driver not found")
        const driver = findResponse.value.aggregate()
        if(!driver) return Result.FailureStr("Driver not found")
        return Result.Success<Driver>(driver)
    }
}