"use server";

import {abort, ActionResponse, success, useServerForm} from "@/hooks/useServerForm";
import {updateVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/updateVehiculeRequest";
import {updateVehiculeUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/updateVehiculeUseCase";
import {unregisterVehiculeUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/unregisterVehiculeUseCase";

export interface UnregisterVehiculeActionState extends ActionResponse {
    immatriculationString: string
}

export async function updateVehiculeAction(prevState: any, formData : FormData) {
    return useServerForm(formData, updateVehiculeRequest, async (payload, success,abort)=>{
        const result = await updateVehiculeUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function unregisterVehiculeAction(state: UnregisterVehiculeActionState) {
    const result = await unregisterVehiculeUseCase({ immatriculation : state.immatriculationString})
    if(!result.success) return abort(result.error.message)
    return success(result.value)
}