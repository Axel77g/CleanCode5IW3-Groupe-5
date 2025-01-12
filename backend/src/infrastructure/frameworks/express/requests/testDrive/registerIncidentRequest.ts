import {z} from "zod";
import {IncidentType} from "@domain/testDrive/enums/IncidentType";
import {dateParser} from "@expressApp/requests/dateParser";

export const registerIncidentRequest = z.object({
    driverLicenseId: z.string(),
    description: z.string(),
    date: dateParser,
    type: z.nativeEnum(IncidentType)
})