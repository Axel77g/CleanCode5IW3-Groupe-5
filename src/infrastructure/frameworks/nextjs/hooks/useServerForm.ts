import {z, ZodSchema} from "zod";
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

export type HandlerFunctionCallable<T> = (object : T, success : (message: string, withPayload ?: boolean) =>  Promise<ActionResponse>, abort : (message: string) =>  Promise<ActionResponse>) =>  Promise<ActionResponse>
export function useServerForm<T extends ZodSchema>(formData: FormData, schema: T, handler : HandlerFunctionCallable<z.infer<T>>) : Promise<ActionResponse> {
    const rawPayload = formDataToObject(formData)
    function abort(message : string) : Promise<ActionResponse>{
        return Promise.resolve({
            message,
            success : false,
            ...rawPayload
        })
    }
    function success(message : string, withPayload ?: boolean) : Promise<ActionResponse> {
        return Promise.resolve({
            message,
            success : true,
            ...(withPayload ? rawPayload : {})
        })
    }
    const payloadResponse = schema.safeParse(rawPayload);
    if(!payloadResponse.success) return abort(getFirstZodError(payloadResponse.error))
    return handler(payloadResponse.data,success,abort)

}