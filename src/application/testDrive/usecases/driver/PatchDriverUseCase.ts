import {Driver} from "@domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";

interface PatchDriverInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    driver: Omit<Partial<Driver>, "driverLicenseId" | "driverLicensedAt" | "documents">;
}

export type PatchDriverUseCase =  IUseCase<PatchDriverInput, Result>

const patchDriverErrors = {
    DRIVER_NOT_FOUND: new ApplicationException("PatchDriver.CannotPatchDriver", "Cannot patch driver")
}

export const createPatchDriverUseCase = (_eventRepository: EventRepository, _driverRepository: DriverRepository): PatchDriverUseCase => {
    return async (input: PatchDriverInput) => {
        const existResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!existResponse.success) return existResponse
        if(existResponse.empty) return Result.Failure(patchDriverErrors.DRIVER_NOT_FOUND)
        const driver = existResponse.value.update(input.driver)
        const response = await _eventRepository.storeEvent(driver.updateEvent())
        if(!response.success) return response
        return Result.Success('Driver updated')
    }
}
