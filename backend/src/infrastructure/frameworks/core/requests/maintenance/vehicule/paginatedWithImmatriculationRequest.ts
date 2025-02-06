import {z} from "zod";
import {paginatedZodObject} from "@infrastructureCore/requests/paginatedRequest";

export const paginatedWithImmatriculationRequest = z.object({
    immatriculation : z.string(),
    ...paginatedZodObject
})