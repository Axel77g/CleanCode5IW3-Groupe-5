import {z} from "zod";
import {Response} from "../core/Response";

export type Controller<T extends z.ZodType<any, any, any>> = (input : z.infer<T>) => Promise<Response>;