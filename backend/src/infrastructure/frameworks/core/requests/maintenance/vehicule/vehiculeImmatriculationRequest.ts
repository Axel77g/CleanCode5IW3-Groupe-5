import {z} from "zod";

export const vehiculeImmatriculationZodObject = {
    immatriculation: z.string().length(9)
}
export const immatriculationRequest = z.object(vehiculeImmatriculationZodObject);