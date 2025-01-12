import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";

export const registerTestDriveRequest = z.object({
    driverLicenseId: z.string(),
    vehicleImmatriculation: z.string(),
    period: z.object({
        startDate: dateParser,
        endDate: dateParser
    })
})