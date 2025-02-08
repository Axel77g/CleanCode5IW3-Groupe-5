import { z } from 'zod'
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";
import {siretZodObject} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
export const registerMaintenanceRequest = z.object({
    vehiculeImmatriculation: z.string(),
    ...siretZodObject,
    status: z.string(),
    maintenanceSpareParts: z.array(z.object({
        unitPrice: stringToNumber,
        quantity: stringToNumber,
        sparePartReference: z.string().min(1).max(255),
    })),
    recommendation: z.string(),
    date: z.string(),
})