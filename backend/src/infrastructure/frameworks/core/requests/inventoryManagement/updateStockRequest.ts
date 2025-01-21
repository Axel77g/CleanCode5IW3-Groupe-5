import {z} from "zod";

export const updateStockRequest = z.object({
    siret: z.string(),
    sparePartReference: z.string(),
    quantity: z.union([z.number(), z.string().refine(val => !isNaN(Number(val)), {
        message: "Must be a number or a string that can be parsed as a number"
    }).transform(val => Number(val))])
})