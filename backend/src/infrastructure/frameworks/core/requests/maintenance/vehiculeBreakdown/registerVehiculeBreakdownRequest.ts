import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";

export const registerVehiculeBreakdownRequest = z.object({
    vehiculeImmatriculation: z.string(),
    description: z.string(),
    date: dateParser,
    maintenanceId: z.string().optional()
})