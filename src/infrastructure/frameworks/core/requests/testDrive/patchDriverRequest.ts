import {z} from "zod";

export const patchDriverRequest = z.object({
    driverLicenseId : z.string(),
    firstName : z.string().min(2).optional(),
    lastName : z.string().min(2).optional(),
    email: z.string().email().optional(),
})