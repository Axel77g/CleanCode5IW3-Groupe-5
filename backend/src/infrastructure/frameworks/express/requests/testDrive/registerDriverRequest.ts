import {z} from "zod";

export const registerDriverRequest = z.object({
    driverLicenseId : z.string(),
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email: z.string().email(),
    driverLicensedAt: z.string().transform((value) =>{
        let date = new Date(value);
        if(isNaN(date.getTime())) throw new Error("Invalid date");
        return date;
    }),
})