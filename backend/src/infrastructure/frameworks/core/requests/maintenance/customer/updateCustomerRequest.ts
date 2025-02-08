import { z } from "zod";

export const updateCustomerRequest = z.object({
    customerId: z.string(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
})