import {z} from "zod";

export const registerTestDriveRequest = z.object({
    driverLicenseId: z.string(),
    vehicleImmatriculation: z.string(),
    period: z.object({
        startDate: z.string().transform((value) => {
            const date = new Date(value)
            if(isNaN(date.getTime())) throw new Error("Invalid date")
            return date
        }),
        endDate: z.string().transform((value) => {
            const date = new Date(value)
            if(isNaN(date.getTime())) throw new Error("Invalid date")
            return date
        })
    })
})