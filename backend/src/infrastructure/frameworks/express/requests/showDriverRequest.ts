import {z} from "zod";

export const showDriverRequest = z.object({
    driverLicenseId : z.string(),
})