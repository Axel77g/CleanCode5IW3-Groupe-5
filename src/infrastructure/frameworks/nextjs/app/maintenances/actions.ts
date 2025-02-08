'use server';

import {useServerForm} from "@/hooks/useServerForm";
import {
    registerMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/maintenance/registerMaintenanceRequest";
import {
    registerMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/registerMaintenanceUseCase";
import {updateMaintenanceRequest} from "@infrastructureCore/requests/maintenance/maintenance/updateMaintenanceRequest";
import {
    updateMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/updateMaintenanceUseCase";

export async function registerMaintenanceAction(prevState: any, formData: FormData) {
    return useServerForm(formData, registerMaintenanceRequest, async (input, success, abort) => {
        const result = await registerMaintenanceUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })
}

export async function updateMaintenanceAction(prevState : any, formData: FormData) {
    return useServerForm(formData, updateMaintenanceRequest, async (input, success, abort) => {
        const result = await updateMaintenanceUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value, true)
    })
}