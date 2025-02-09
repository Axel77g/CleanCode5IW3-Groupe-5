import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";

export const registerDriverRequest = z.object({
    driverLicenseId : z.string(),
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email: z.string().email(),
    birthDate: dateParser,
    driverLicensedAt: dateParser
})