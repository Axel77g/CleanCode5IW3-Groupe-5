'use server';

import {useServerForm} from "@/hooks/useServerForm";
import {registerVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/registerVehiculeRequest";
import {
    registerVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/registerVehiculeUseCase";
import {createListVehiculesUseCase} from "@application/maintenance/usecases/vehicule/ListVehiculesUseCase";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {PaginatedInput} from "@shared/PaginatedInput";

export async function registerVehiculeAction(prevState: any, formData: FormData) {
    return useServerForm(formData, registerVehiculeRequest, async (input, success, abort) => {
        const result = await registerVehiculeUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })}

export async function getVehicules(pagination: PaginatedInput) {
    const listVehiculeUseCase = createListVehiculesUseCase(vehiculeRepository)
    const vehiculeResult = await listVehiculeUseCase({...pagination})
    return vehiculeResult
}