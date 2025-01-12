import {z} from "zod";

export const updateStockRequest = z.object({
    siret: z.string(),
    sparePartReference: z.string(),
    quantity: z.number()
})