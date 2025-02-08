"use server";

import {useServerForm} from "@/hooks/useServerForm";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {
    registerDealerUseCase
} from "@infrastructureCore/useCaseImplementation/InventoryManagement/registerDealerUseCase";

export async function registerDealer(prevState: any, formData: FormData){
    return useServerForm(formData,registerDealerRequest, async (payload, success, abort) =>{
        const result = await registerDealerUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}