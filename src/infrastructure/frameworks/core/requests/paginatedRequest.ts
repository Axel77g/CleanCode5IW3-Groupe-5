import {z} from "zod";


export const paginatedZodObject = {
    limit: z.string().default("10").transform((v) => Math.min(parseInt(v),20) || 10),
    page: z.string().default("1").transform((v) => parseInt(v) || 1),
}

export const paginatedRequest = z.object(paginatedZodObject)