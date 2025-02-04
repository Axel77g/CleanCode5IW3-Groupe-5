"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {updateCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/updateCustomerRequest";
import {updateCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/updateCustomerUseCase";

export async function updateCustomerAction(prevState: any, formData : FormData) {
    return useServerForm(formData, updateCustomerRequest, async (payload, success,abort)=>{
        const result = await updateCustomerUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}