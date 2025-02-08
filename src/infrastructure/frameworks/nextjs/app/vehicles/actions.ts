'use server';

import {useServerForm} from "@/hooks/useServerForm";
import {registerVehicleRequest} from "@infrastructureCore/requests/maintenance/vehicle/registerVehicleRequest";
import {
    registerVehicleUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicle/registerVehicleUseCase";
import {createListVehiclesUseCase} from "@application/maintenance/usecases/vehicle/ListVehiclesUseCase";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {PaginatedInput} from "@shared/PaginatedInput";

export async function registerVehicleAction(prevState: any, formData: FormData) {
    return useServerForm(formData, registerVehicleRequest, async (input, success, abort) => {
        const result = await registerVehicleUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })}

export async function getVehicles(pagination: PaginatedInput) {
    const listVehicleUseCase = createListVehiclesUseCase(vehicleRepository)
    const vehicleResult = await listVehicleUseCase({...pagination})
    return vehicleResult
}