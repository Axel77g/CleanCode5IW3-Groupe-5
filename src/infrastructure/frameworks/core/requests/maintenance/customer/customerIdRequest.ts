import {z} from "zod";

export const customerIdZodObject = {
    customerId: z.string().length(36, "The customer id must be a string of 36 characters")
}

export const customerIdRequest = z.object(customerIdZodObject);