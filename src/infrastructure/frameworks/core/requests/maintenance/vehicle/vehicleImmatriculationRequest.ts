import {z} from "zod";

export const vehicleImmatriculationZodObject = {
    immatriculation: z.string().length(9)
}
export const immatriculationRequest = z.object(vehicleImmatriculationZodObject);