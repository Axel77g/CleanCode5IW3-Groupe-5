"use server";

import {registerCustomerRequest} from "@infrastructureCore/requests/maintenance/customer/registerCustomerRequest";
import {useServerForm} from "@/hooks/useServerForm";
import {registerCustomerUseCase} from "@infrastructureCore/useCaseImplementation/maintenance/customer/registerCustomerUseCase";

export async function registerCustomerAction(prevState: any, formData : FormData) {
    return useServerForm(formData, registerCustomerRequest, async (input, success, abort) => {
        const result = await registerCustomerUseCase(input);
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })}