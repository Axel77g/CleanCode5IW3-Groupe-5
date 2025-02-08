import {z} from "zod";
import {IUseCase} from "@shared/IUseCase";
import {FailureResult, Result} from "@shared/Result";

export type UseCaseImplementation<T extends z.ZodType<any, any, any>, K extends IUseCase<any, Result<any>> = IUseCase<any, Result<any>>> = (input : z.infer<T>, files ?: File[]) => Promise<FailureResult> | ReturnType<K> ;