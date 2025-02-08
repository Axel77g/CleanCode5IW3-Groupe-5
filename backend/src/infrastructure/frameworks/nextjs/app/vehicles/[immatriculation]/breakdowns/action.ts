"use server"

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {
    registerVehicleBreakdownRequest
} from "@infrastructureCore/requests/maintenance/vehicleBreakdown/registerVehicleBreakdownRequest";
import {
    registerVehicleBreakdownUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicleBreakdown/registerVehicleBreakdownUseCase";
import {
    assignVehicleBreakdownToMaintenanceUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicleBreakdown/assignVehicleBreakdownToMaintenanceUseCase";
import {
    assignVehicleBreakdownToMaintenanceRequest
} from "@infrastructureCore/requests/maintenance/vehicleBreakdown/assignVehicleBreakdownToMaintenanceRequest";

export async function registerVehicleBreakdown(prevState: ActionResponse, formData: FormData) {
    return useServerForm(formData, registerVehicleBreakdownRequest, async (payload, success, abort) => {
        const result = await registerVehicleBreakdownUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value);
    })
}

export async function assignVehicleBreakdownToMaintenance(prevState: any, formData: FormData) {
    return useServerForm(formData, assignVehicleBreakdownToMaintenanceRequest, async (payload, success, abort) => {
        const result = await assignVehicleBreakdownToMaintenanceUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value);
    })
}

