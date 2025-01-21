"use server";

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {registerIncidentRequest} from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {createRegisterIncidentUseCase} from "@application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";

export async function registerDriverIncident(prevState: ActionResponse, formData : FormData){
    return useServerForm(formData, registerIncidentRequest, async (payload, success, abort)=> {
        const driverLicenseId = DriverLicenseId.create(payload.driverLicenseId)
        if(driverLicenseId instanceof Error) return abort(driverLicenseId.message)
        const registerDriverIncidentUseCase = createRegisterIncidentUseCase(testDriveEventRepository,driverRepository)
        const result = await registerDriverIncidentUseCase({
            ...payload,
            driverLicenseId: driverLicenseId,
        })
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}