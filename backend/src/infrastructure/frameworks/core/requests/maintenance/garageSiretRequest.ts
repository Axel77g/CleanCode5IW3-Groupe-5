import { z } from "zod";

export const customerIdRequest = z.object({
    siret: z.string(),
});