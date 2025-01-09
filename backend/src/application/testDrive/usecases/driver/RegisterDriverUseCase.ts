import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {Result} from "../../../../shared/Result";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverCreatedEvent} from "../../../../domain/testDrive/Events/DriverCreatedEvent";

interface RegisterDriverInput extends IInputUseCase{
    driverLicenceId: DriverLicenseId,
    firstName : string ,
    lastName: string,
    email: string,
    driverLicensedAt: Date,
}

export type RegisterDriverUseCase = IUseCase<RegisterDriverInput, Result>

export const registerDriverUseCase = (_testDriveEventRepository: TestDriveEventRepository): RegisterDriverUseCase => {
    return async (input: RegisterDriverInput) => {
        if(!input.driverLicenceId.isValid()) return Result.FailureStr("Invalid driver license id")
        if(input.driverLicensedAt > new Date()) return Result.FailureStr("Invalid driver license date")
        const driverCreatedEvent = new DriverCreatedEvent({
            driverLicenceId: input.driverLicenceId.getValue(),
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            driverLicensedAt: input.driverLicensedAt
        })
        const storeResponse = await _testDriveEventRepository.storeEvent(driverCreatedEvent);
        if(!storeResponse.success) return Result.FailureStr("Cannot register driver")
        return Result.Success("driver registered")
    }
}