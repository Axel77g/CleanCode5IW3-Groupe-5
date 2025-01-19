import {ZodSchema} from "zod";
import {formDataToObject} from "@/utils/FormDataToObject";
import {patchDriverRequest} from "@infrastructureCore/requests/testDrive/patchDriverRequest";
import {getFirstZodError} from "@/utils/getFirstZodError";

export interface FormResponse {
    success : boolean,
    message: string,
}


export type HandlerFunctionCallable = (object : any, succes : (message: string) =>  Promise<FormResponse>, abort : (message: string) =>  Promise<FormResponse>) =>  Promise<FormResponse>
export function useServerForm(formData: FormData, schema: ZodSchema, handler : HandlerFunctionCallable) : Promise<FormResponse> {
    let rawPayload = formDataToObject(formData)
    function abort(message : string) : Promise<FormResponse>{
        return Promise.resolve({
            message,
            success : false,
            ...rawPayload
        })
    }
    function success(message : string) : Promise<FormResponse> {
        return Promise.resolve({
            message,
            success : true,
            ...rawPayload
        })
    }
    const payloadResponse = patchDriverRequest.safeParse(rawPayload);
    if(!payloadResponse.success) return abort(getFirstZodError(payloadResponse.error))
    return handler(payloadResponse,success,abort)
}