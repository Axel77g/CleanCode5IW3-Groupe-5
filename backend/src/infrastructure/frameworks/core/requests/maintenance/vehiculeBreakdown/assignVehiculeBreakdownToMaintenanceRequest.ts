import {z} from "zod";

export const assignVehiculeBreakdownToMaintenanceRequest = z.object({
    vehiculeBreakdownId: z.string(),
    maintenanceId: z.string(),
})