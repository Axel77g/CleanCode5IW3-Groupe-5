import {z} from "zod";

export const customerIdZodObject = {
    customerId: z.string().length(36)
}

export const customerIdRequest = z.object(customerIdZodObject);