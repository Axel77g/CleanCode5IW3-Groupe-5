import { siretZodObject } from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import { z } from 'zod';

export const registerGarageRequest = z.object({
    ...siretZodObject,
    name: z.string(),
    phoneNumber: z.string(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string().max(2).min(2),
        postalCode: z.string()
    })
})