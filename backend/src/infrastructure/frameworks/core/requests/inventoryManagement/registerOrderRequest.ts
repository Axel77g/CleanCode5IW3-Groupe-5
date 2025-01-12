import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";

export const registerOrderRequest = z.object({
    dealer: z.string().min(1).max(255),
    deliveryDate: dateParser,
    orderedDate: dateParser,
    orderLines: z.array(z.object({
        reference: z.string().min(1).max(255),
        quantity: z.number().int().positive(),
        unitPrice: z.number().int().positive()
    }))
})