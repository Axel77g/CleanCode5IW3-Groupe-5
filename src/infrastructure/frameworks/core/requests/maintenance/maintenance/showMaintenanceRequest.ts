import {z} from "zod";

export const showMaintenanceRequest = z.object({
    maintenanceId: z.string().uuid()
})