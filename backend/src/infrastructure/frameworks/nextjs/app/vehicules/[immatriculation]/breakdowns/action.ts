"use server"

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {
    registerVehiculeBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/registerVehiculeBreakdownRequest";
import {
    registerVehiculeBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/registerVehiculeBreakdownUseCase";
import {
    assignVehiculeBreakdownToMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehiculeBreakdown/assignVehiculeBreakdownToMaintenanceUseCase";
import {
    assignVehiculeBreakdownToMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/vehiculeBreakdown/assignVehiculeBreakdownToMaintenanceRequest";

export async function registerVehiculeBreakdown(prevState: ActionResponse, formData: FormData) {
    return useServerForm(formData, registerVehiculeBreakdownRequest, async (payload, success, abort) => {
        const result = await registerVehiculeBreakdownUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value);
    })
}

export async function assignVehiculeBreakdownToMaintenance(prevState: any, formData: FormData) {
    return useServerForm(formData, assignVehiculeBreakdownToMaintenanceRequest, async (payload, success, abort) => {
        const result = await assignVehiculeBreakdownToMaintenanceUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value);
    })
}

