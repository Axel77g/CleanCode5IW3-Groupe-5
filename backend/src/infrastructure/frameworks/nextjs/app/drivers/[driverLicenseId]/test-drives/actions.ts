"use server";

import {ActionResponse, useServerForm} from "@/hooks/useServerForm";
import {registerTestDriveRequest} from "@infrastructureCore/requests/testDrive/registerTestDriveRequest";
import {registerTestDriveUseCase} from "@infrastructureCore/useCaseImplementation/testDrive/registerTestDriveUseCase";

export async function registerDriverTestDrive(state : Awaited<ActionResponse>, formData: FormData){
    return useServerForm(
        formData,
        registerTestDriveRequest,
        async (payload, success, abort)=> {
            const result = await registerTestDriveUseCase(payload)
            if(!result.success) return abort(result.error.message)
            return success(result.value)
        })
}