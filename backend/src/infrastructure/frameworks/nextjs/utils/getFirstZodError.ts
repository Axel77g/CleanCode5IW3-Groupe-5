import {SafeParseError, ZodError} from "zod";

export function getFirstZodError(error: ZodError<unknown>){
    const firstError = error.errors[0]
    if(!firstError) return "Unknown error"
    return firstError.path.join(".") + ' : ' + firstError.message
}