import {
    registerVehiculeRequest
} from '../../../../../../dist/infrastructure/frameworks/core/requests/maintenance/registerVehiculeRequest';
import {
    createRegisterVehiculeUseCase
} from '../../../../../../dist/application/maintenance/usecases/vehicule/RegisterVehiculeUseCase';
"use server";

import { useServerForm } from "@/hooks/useServerForm";

export async function registerVehicule(prevState: any, formData: FormData) {
    return useServerForm(formData, registerVehiculeRequest, async (payload, success, abort) => {
        const result = await registerVehiculeUseCAse(payload);
        if (!result.success) return abort(result.error.message);
        return success(result.value);
    };
}