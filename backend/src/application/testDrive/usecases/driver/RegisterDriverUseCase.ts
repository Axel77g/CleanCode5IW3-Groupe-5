import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {Result} from "../../../../shared/Result";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DriverCreatedEvent} from "../../../../domain/testDrive/Events/DriverCreatedEvent";
import {ApplicationException} from "../../../../shared/ApplicationException";

interface RegisterDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId,
    firstName : string ,
    lastName: string,
    email: string,
    driverLicensedAt: Date,
}

export type RegisterDriverUseCase = IUseCase<RegisterDriverInput, Result>

const registerDriverErrors = {
    INVALID_DRIVER_LICENSE_DATE: new ApplicationException("RegisterDriver.INVALID_DRIVER_LICENSE_DATE", "Invalid driver license date"),
    CANNOT_REGISTER_DRIVER: new ApplicationException("RegisterDriver.CannotRegisterDriver", "Cannot register driver")
}

export const registerDriverUseCase = (_eventRepository: EventRepository): RegisterDriverUseCase => {
    return async (input: RegisterDriverInput) => {
        if(input.driverLicensedAt > new Date()) return Result.Failure(registerDriverErrors.INVALID_DRIVER_LICENSE_DATE)
        const driverCreatedEvent = new DriverCreatedEvent({
            driverLicenseId: input.driverLicenseId.getValue(),
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            driverLicensedAt: input.driverLicensedAt,
            documents: []
        })
        const storeResponse = await _eventRepository.storeEvent(driverCreatedEvent);
        if(!storeResponse.success) return Result.Failure(registerDriverErrors.CANNOT_REGISTER_DRIVER)
        return Result.Success("driver registered")
    }
}