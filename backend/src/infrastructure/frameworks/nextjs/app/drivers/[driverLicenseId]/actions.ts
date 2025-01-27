"use server";

import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {useServerForm} from "@/hooks/useServerForm";
import {patchDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/patchDriverUseCase";

export async function patchDriverAction(prevState: any, formData : FormData){
    return useServerForm(formData, patchDriverRequest, async (payload, success,abort)=>{
        const result = await patchDriverUseCase(payload)
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })
}



