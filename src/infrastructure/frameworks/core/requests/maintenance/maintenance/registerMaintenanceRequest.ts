import { z } from 'zod'
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";
import {siretZodObject} from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
export const registerMaintenanceRequest = z.object({
    vehicleImmatriculation: z.string(),
    ...siretZodObject,
    status: z.nativeEnum(MaintenanceStatusEnum, {message: "Invalid status"}),
    maintenanceSpareParts: z.array(z.object({
        unitPrice: stringToNumber,
        quantity: stringToNumber,
        sparePartReference: z.string().min(1).max(255),
    })),
    recommendation: z.string(),
    date: z.string(),
})