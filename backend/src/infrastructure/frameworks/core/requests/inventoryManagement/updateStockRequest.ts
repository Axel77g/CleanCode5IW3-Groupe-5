import {z} from "zod";
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";

export const updateStockRequest = z.object({
    siret: z.string(),
    sparePartReference: z.string(),
    quantity: stringToNumber
})