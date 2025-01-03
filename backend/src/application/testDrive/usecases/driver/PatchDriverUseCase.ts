import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {Result} from "../../../../shared/Result";
import {DriverRepository} from "../../repositories/DriverRepository";

interface PatchDriverInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    driver: Partial<Driver>;
}

export type PatchDriverUseCase =  IUseCase<PatchDriverInput, Result>

export const patchDriverUseCase = (_driverRepository: DriverRepository): PatchDriverUseCase => {
    return async (input: PatchDriverInput) => {
        const findResponse = await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!findResponse.success) return Result.FailureStr("Driver not found")
        const driver = findResponse.value
        const storeResponse = await _driverRepository.update(driver.patch(input.driver));
        if(!storeResponse.success) return Result.FailureStr("Cannot update driver")
        return Result.Success("Driver updated")
    }
}
