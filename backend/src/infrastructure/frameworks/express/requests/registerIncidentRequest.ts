import {z} from "zod";
import {IncidentType} from "@domain/testDrive/enums/IncidentType";

export const registerIncidentRequest = z.object({
    driverLicenseId: z.string(),
    description: z.string(),
    date: z.string().transform((value) => {
        const date = new Date(value)
        if(isNaN(date.getTime())) throw new Error("Invalid date")
        return date
    }),
    type: z.nativeEnum(IncidentType)
})