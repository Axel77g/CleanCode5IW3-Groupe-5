import { customerIdZodObject } from "@infrastructureCore/requests/maintenance/customerIdRequest";
import { z } from "zod";

export const registerCustomerRequest = z.object({
    ...customerIdZodObject,
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string().max(2).min(2),
        postalCode: z.string()
    })
})