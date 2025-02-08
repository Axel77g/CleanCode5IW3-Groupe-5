'use server';

import {registerDriverRequest} from "@infrastructureCore/requests/testDrive/registerDriverRequest";
import {useServerForm} from "@/hooks/useServerForm";
import {registerDriverUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerDriverUseCase";

export async function registerDriverAction(prevState: any, formData : FormData){
    return useServerForm(formData, registerDriverRequest,async (input, success,abort)=>{
        const result = await registerDriverUseCase(input);
        if(!result.success) return abort(result.error.message)
        return success(result.value)
    })}