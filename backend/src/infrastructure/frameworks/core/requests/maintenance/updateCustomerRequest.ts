import { z } from "zod";

export const updateCustomerRequest = z.object({
    customerId: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
})