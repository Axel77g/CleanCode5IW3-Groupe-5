import {paginatedZodObject} from "@infrastructureCore/requests/paginatedRequest";
import {z} from "zod";

export const paginatedWithCustomerIdRequest = z.object({
    customerId : z.string(),
    ...paginatedZodObject
})