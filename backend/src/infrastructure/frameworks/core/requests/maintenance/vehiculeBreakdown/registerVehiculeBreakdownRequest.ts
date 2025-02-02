import {z} from "zod";

export const registerVehiculeBreakdownRequest = z.object({
    vehiculeImmatriculation: z.string(),
    description: z.string(),
    date: z.date(),
    maintenanceId: z.string().optional()
})