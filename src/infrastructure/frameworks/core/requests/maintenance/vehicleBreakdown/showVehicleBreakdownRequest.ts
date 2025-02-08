import {z} from "zod";

export const showVehicleBreakdownRequest = z.object({
    vehicleBreakdownId: z.string(),
})