import {siretZodObject} from "@expressApp/requests/inventoryManagement/siretRequest";
import {z} from "zod";

export const registerDealerRequest = z.object({
    ...siretZodObject,
    name: z.string(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string().length(2)
    }),
    phoneNumber: z.string()
})