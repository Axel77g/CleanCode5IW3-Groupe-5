import {ZodSchema} from "zod";
import {formDataToObject} from "@/utils/FormDataToObject";
import {getFirstZodError} from "@/utils/getFirstZodError";

export interface ActionResponse {
    success : boolean,
    message: string,
}


export function abort(message: string) : Promise<ActionResponse>{
    return Promise.resolve({
        message,
        success:false
    })
}

export function success(message: string) : Promise<ActionResponse>{
    return Promise.resolve({
        message,
        success:false,
    })
}

export type HandlerFunctionCallable = (object : any, success : (message: string) =>  Promise<ActionResponse>, abort : (message: string) =>  Promise<ActionResponse>) =>  Promise<ActionResponse>
export function useServerForm(formData: FormData, schema: ZodSchema, handler : HandlerFunctionCallable) : Promise<ActionResponse> {
    let rawPayload = formDataToObject(formData)
    function abort(message : string) : Promise<ActionResponse>{
        return Promise.resolve({
            message,
            success : false,
            ...rawPayload
        })
    }
    function success(message : string) : Promise<ActionResponse> {
        return Promise.resolve({
            message,
            success : true,
            ...rawPayload
        })
    }
    console.log(rawPayload)
    const payloadResponse = schema.safeParse(rawPayload);
    if(!payloadResponse.success) return abort(getFirstZodError(payloadResponse.error))
    return handler(payloadResponse.data,success,abort)
}