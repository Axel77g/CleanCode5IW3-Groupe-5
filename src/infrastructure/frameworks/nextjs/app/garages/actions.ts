"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {registerGarageRequest} from "@infrastructureCore/requests/maintenance/garage/registerGarageRequest";
import {
    registerGarageUseCase
} from "@infrastructureCore/useCaseImplementation/maintenance/garage/registerGarageUseCase";
import {createListGarageUseCase} from "@application/maintenance/usecases/garage/ListGarageUseCase";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";
import {PaginatedInput} from "@shared/PaginatedInput";

export async function registerGarageAction(prevState:any, formData: FormData) {
    return useServerForm(formData, registerGarageRequest, async (input, success, abort) => {
        const result = await registerGarageUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })}

export async function getGarages(pagination: PaginatedInput) {
    const listGarageUseCase = createListGarageUseCase(garageRepository)
    const garageResult = await listGarageUseCase({...pagination})
    return garageResult
}