import {z} from "zod";

export const paginatedWithDriverLicenseIdRequest = z.object({
    driverLicenseId : z.string(),
    limit: z.string().default("10").transform((v) => Math.min(parseInt(v),20) || 10),
    page: z.string().default("1").transform((v) => parseInt(v) || 1),
})