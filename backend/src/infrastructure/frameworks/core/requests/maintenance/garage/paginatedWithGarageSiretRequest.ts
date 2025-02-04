import {z} from "zod";
import {paginatedZodObject} from "@infrastructureCore/requests/paginatedRequest";

export const paginatedWithGarageSiretRequest = z.object({
    garageSiret: z.string(),
    ...paginatedZodObject
})