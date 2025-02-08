import {z} from "zod";
import {paginatedZodObject} from "@infrastructureCore/requests/paginatedRequest";

export const paginatedWithDriverLicenseIdRequest = z.object({
    driverLicenseId : z.string(),
    ...paginatedZodObject
})