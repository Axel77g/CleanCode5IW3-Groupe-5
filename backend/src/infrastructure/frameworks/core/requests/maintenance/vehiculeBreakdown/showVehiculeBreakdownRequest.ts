import {z} from "zod";

export const showVehiculeBreakdownRequest = z.object({
    vehiculeImmatriculation: z.string(),
})