import {Result} from "../../../../shared/Result";
import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {DriverRepository} from "../../repositories/DriverRepository";
import {DriverDocumentsRepository} from "../../repositories/DriverDocumentsRepository";
import {DriverDocuments} from "../../../../domain/testDrive/value-object/DriverDocuments";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";

interface ShowDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId
}



export type ShowDriverUseCase =  IUseCase<ShowDriverInput, Result<Driver>>

export const showDriverUseCase = (_testDriveEventRepository : TestDriveEventRepository): ShowDriverUseCase => {
    return async (input: ShowDriverInput) => {
        //const findResponse = await _testDriveEventRepository.getEvents<DriverAggregate>('driver-' + input.driverLicenseId.getValue(), _eventAggregateMapper)
        //if(!findResponse.success) return Result.FailureStr("Driver not found")
        const driver = {} as Driver
        if(!driver) return Result.FailureStr("Driver not found")
        return Result.Success<Driver>(driver)
    }
}