"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {updateVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/updateVehiculeRequest";
import {
    updateVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/updateVehiculeUseCase";

export async function updateVehiculeAction(prevState: any, formData : FormData) {
    return useServerForm(formData, updateVehiculeRequest, async (payload, success,abort)=>{
        const result = await updateVehiculeUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}