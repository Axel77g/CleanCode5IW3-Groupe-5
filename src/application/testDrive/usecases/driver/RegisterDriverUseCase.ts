import { IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {Driver} from "@domain/testDrive/entities/Driver";

export interface RegisterDriverInput extends IInputUseCase{
    driverLicenseId: DriverLicenseId,
    firstName : string ,
    lastName: string,
    email: string,
    birthDate: Date,
    driverLicensedAt: Date,
}

export type RegisterDriverUseCase = IUseCase<RegisterDriverInput, Result>

const registerDriverErrors = {
    CANNOT_REGISTER_DRIVER: new ApplicationException("RegisterDriver.CannotRegisterDriver", "Cannot register driver"),
    DRIVER_ALREADY_REGISTERED: new ApplicationException("RegisterDriver.DriverAlreadyRegistered", "Driver already registered")
}

export const createRegisterDriverUseCase = (_eventRepository: EventRepository, driverRepository: DriverRepository): RegisterDriverUseCase => {
    return async (input: RegisterDriverInput) => {
        const existingDriverResponse = await driverRepository.getByLicenseId(input.driverLicenseId)
        if(!existingDriverResponse.success) return existingDriverResponse
        if(!existingDriverResponse.empty) return Result.Failure(registerDriverErrors.DRIVER_ALREADY_REGISTERED)
        const driver = Driver.create({
            driverLicenseId: input.driverLicenseId,
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            birthDate: input.birthDate,
            driverLicensedAt: input.driverLicensedAt,
            documents: []
        })
        if(driver instanceof ApplicationException) return Result.Failure(driver)
        const storeResponse = await _eventRepository.storeEvent(driver.createEvent());
        if(!storeResponse.success) return Result.Failure(registerDriverErrors.CANNOT_REGISTER_DRIVER)
        return Result.Success("driver registered")
    }
}