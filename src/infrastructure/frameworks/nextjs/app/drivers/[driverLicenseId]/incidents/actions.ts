"use server";

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {registerIncidentRequest} from "@infrastructureCore/requests/testDrive/registerIncidentRequest";
import {registerIncidentUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerIncidentUseCase";

export async function registerDriverIncident(prevState: ActionResponse, formData : FormData){
    return useServerForm(formData, registerIncidentRequest, async (payload, success, abort)=> {
        const result = await registerIncidentUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value);
    })
}