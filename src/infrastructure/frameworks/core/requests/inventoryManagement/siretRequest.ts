import {z} from "zod";

export const siretZodObject = {
    siret: z.string().length(14)
}

export const siretRequest = z.object(siretZodObject);