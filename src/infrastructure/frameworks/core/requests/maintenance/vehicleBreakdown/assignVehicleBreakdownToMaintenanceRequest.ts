import {z} from "zod";

export const assignVehicleBreakdownToMaintenanceRequest = z.object({
    vehicleBreakdownId: z.string(),
    maintenanceId: z.string()
})