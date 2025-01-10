import {z} from "zod";
import {paginatedZodObject} from "@expressApp/requests/paginatedRequest";

export const paginatedWithDriverLicenseIdRequest = z.object({
    driverLicenseId : z.string(),
    ...paginatedZodObject
})