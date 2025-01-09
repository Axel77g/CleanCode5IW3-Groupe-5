import {Driver} from "../../../../domain/testDrive/entities/Driver";
import {IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DriverLicenseId} from "../../../../domain/testDrive/value-object/DriverLicenseId";
import {Result} from "../../../../shared/Result";
import {TestDriveEventRepository} from "../../repositories/TestDriveEventRepository";
import {DriverUpdatedEvent} from "../../../../domain/testDrive/Events/DriverUpdatedEvent";

interface PatchDriverInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    driver: Partial<Driver>;
}

export type PatchDriverUseCase =  IUseCase<PatchDriverInput, Result>

export const patchDriverUseCase = (_testDriveEventRepository: TestDriveEventRepository): PatchDriverUseCase => {
    return async (input: PatchDriverInput) => {
        const existResponse = await _testDriveEventRepository.exists('driver-' + input.driverLicenseId.getValue()) //@TODO: Change to driverRepository getDriverByLicenseId to check if driver exists and is not deleted
        if(!existResponse.success) return Result.FailureStr("Driver does not exist")
        const driverUpdatedEvent = new DriverUpdatedEvent({
            driverLicenseId: input.driverLicenseId.getValue(),
            firstName: input.driver?.firstName,
            lastName: input.driver?.lastName,
            email: input.driver?.email
        })

        const response = await _testDriveEventRepository.storeEvent(driverUpdatedEvent)
        if(!response.success) return response
        return Result.Success('Driver updated')
    }
}
