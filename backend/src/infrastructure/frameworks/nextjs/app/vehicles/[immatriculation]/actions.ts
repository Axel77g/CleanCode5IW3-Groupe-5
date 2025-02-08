"use server";

import {abort, ActionResponse, success, useServerForm} from "@/hooks/useServerForm";
import {updateVehicleRequest} from "@infrastructureCore/requests/maintenance/vehicle/updateVehicleRequest";
import {updateVehicleUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/updateVehicleUseCase";
import {unregisterVehicleUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/unregisterVehicleUseCase";

export interface UnregisterVehicleActionState extends ActionResponse {
    immatriculationString: string
}

export async function updateVehicleAction(prevState: any, formData : FormData) {
    return useServerForm(formData, updateVehicleRequest, async (payload, success,abort)=>{
        const result = await updateVehicleUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function unregisterVehicleAction(state: UnregisterVehicleActionState) {
    const result = await unregisterVehicleUseCase({ immatriculation : state.immatriculationString})
    if(!result.success) return abort(result.error.message)
    return success(result.value)
}