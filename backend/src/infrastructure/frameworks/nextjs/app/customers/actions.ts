"use server";

import { useServerForm } from '@/hooks/useServerForm';
import {
    registerCustomerRequest
} from '@infrastructureCore/requests/maintenance/customer/registerCustomerRequest';
import {
    registerCustomerUseCase
} from '../../../../../../dist/infrastructure/frameworks/core/useCaseImplementation/maintenance/registerCustomerUseCase';


export async function registerCustomer(prevState: any, formData: FormData) {
    return useServerForm(formData, registerCustomerRequest, async (payload, success, abort) => {
        const result = await registerCustomerUseCase(payload)
        if (!result.success) return abort(result.error.message)
        return success(result.value)
    })
}