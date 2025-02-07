'use server';

import {useServerForm} from "@/hooks/useServerForm";
import {
    registerMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/maintenance/registerMaintenanceRequest";
import {
    registerMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/maintenance/registerMaintenanceUseCase";

export async function registerMaintenanceAction(prevState: any, formData: FormData) {
    return useServerForm(formData, registerMaintenanceRequest, async (input, success, abort) => {
        const result = await registerMaintenanceUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })
}