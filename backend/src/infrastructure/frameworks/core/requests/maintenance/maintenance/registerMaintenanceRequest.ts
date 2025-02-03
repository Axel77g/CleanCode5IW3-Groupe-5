import { z } from 'zod'
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";
export const registerMaintenanceRequest = z.object({
    maintenanceId: z.string(),
    vehiculeImmatriculation: z.string(),
    garageSiret: z.string(),
    status: z.string(),
    maintenanceSpareParts: z.array(z.object({
        price: stringToNumber,
        quantity: stringToNumber,
        sparePartReference: z.string().min(1).max(255),
    })),
    recommendation: z.string(),
    date: z.string(),
})