import { z } from "zod";

export const customerIdRequest = z.object({
    customerId: z.string(),
});