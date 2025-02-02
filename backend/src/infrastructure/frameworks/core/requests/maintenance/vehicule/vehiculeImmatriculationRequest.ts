import {z} from "zod";

export const vehiculeImmatriculationZodObject = {
    immatriculation: z.string().length(7)
}

export const immatriculationRequest = z.object(vehiculeImmatriculationZodObject);