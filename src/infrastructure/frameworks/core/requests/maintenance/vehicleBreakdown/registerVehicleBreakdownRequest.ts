import {z} from "zod";
import {dateParser} from "@infrastructureCore/requests/dateParser";

export const registerVehicleBreakdownRequest = z.object({
    vehicleImmatriculation: z.string(),
    description: z.string(),
    date: dateParser,
    maintenanceId: z.string().optional()
})