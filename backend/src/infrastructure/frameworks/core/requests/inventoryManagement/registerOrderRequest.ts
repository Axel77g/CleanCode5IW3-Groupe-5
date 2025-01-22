import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";

export const registerOrderRequest = z.object({
    dealerSiret: z.string().min(1).max(14),
    deliveryDate: dateParser,
    orderedDate: dateParser,
    orderLines: z.array(z.object({
        reference: z.string().min(1).max(255),
        quantity: stringToNumber,
        unitPrice: stringToNumber
    }))
})