"use server";

import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createPatchDriverUseCase} from "@application/testDrive/usecases/driver/PatchDriverUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {useServerForm} from "@/hooks/useServerForm";

export async function patchDriverAction(prevState: any, formData : FormData){
    return useServerForm(formData, patchDriverRequest, async (payload, success,abort)=>{
        const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
        if(driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const patchDriverUseCase = createPatchDriverUseCase(testDriveEventRepository)
        const result = await patchDriverUseCase({
            driverLicenseId,
            driver: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email
            }
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}



