import {z} from "zod";

export const patchDriverRequest = z.object({
    driverLicenseId : z.string(),
    firstName : z.string().min(2).optional(),
    lastName : z.string().min(2).optional(),
    email: z.string().email().optional(),
    driverLicensedAt: z.string().transform((value) =>{
        let date = new Date(value);
        if(isNaN(date.getTime())) throw new Error("Invalid date");
        return date;
    }).optional(),
})