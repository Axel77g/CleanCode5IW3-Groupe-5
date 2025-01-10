import {Driver} from "@domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Result} from "@shared/Result";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DriverUpdatedEvent} from "@domain/testDrive/Events/DriverUpdatedEvent";
import {ApplicationException} from "@shared/ApplicationException";

interface PatchDriverInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    driver: Partial<Driver>;
}

export type PatchDriverUseCase =  IUseCase<PatchDriverInput, Result>

const patchDriverErrors = {
    DRIVER_NOT_FOUND: new ApplicationException("PatchDriver.CannotPatchDriver", "Cannot patch driver")
}

export const createPatchDriverUseCase = (_eventRepository: EventRepository): PatchDriverUseCase => {
    return async (input: PatchDriverInput) => {
        const existResponse = await _eventRepository.exists('driver-' + input.driverLicenseId.getValue()) //@TODO: Change to driverRepository getDriverByLicenseId to check if driver exists and is not deleted
        if(!existResponse.success) return Result.Failure(patchDriverErrors.DRIVER_NOT_FOUND)
        const driverUpdatedEvent = new DriverUpdatedEvent({
            driverLicenseId: input.driverLicenseId.getValue(),
            firstName: input.driver?.firstName,
            lastName: input.driver?.lastName,
            email: input.driver?.email
        })

        const response = await _eventRepository.storeEvent(driverUpdatedEvent)
        if(!response.success) return response
        return Result.Success('Driver updated')
    }
}
