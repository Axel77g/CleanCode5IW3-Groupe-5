import { updateCustomerRequest } from '../../../../core/requests/maintenance/updateCustomerRequest';
import {
    updateCustomerUseCase
} from '../../../../core/useCaseImplementation/maintenance/updateCustomerUseCase';
"use server"

import { useServerForm } from "@/hooks/useServerForm";

export async function updateCustomerAction(prevState: any, formData: FormData) {
    return useServerForm(formData, updateCustomerRequest, async (payload, success, abort) => {
        const result = await updateCustomerUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })
}