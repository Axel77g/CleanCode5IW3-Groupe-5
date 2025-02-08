import {z} from "zod";

export const showVehiculeBreakdownRequest = z.object({
    vehiculeBreakdownId: z.string(),
})