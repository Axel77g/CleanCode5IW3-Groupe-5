'use server';

import {useServerForm} from "@/hooks/useServerForm";
import {registerVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/registerVehiculeRequest";
import {
    registerVehiculeUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/vehicule/registerVehiculeUseCase";

export async function registerVehiculeAction(prevState: any, formData: FormData) {
    return useServerForm(formData, registerVehiculeRequest, async (input, success, abort) => {
        const result = await registerVehiculeUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })}