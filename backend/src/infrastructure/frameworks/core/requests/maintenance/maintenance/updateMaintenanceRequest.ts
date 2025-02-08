import {z} from "zod";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";
import { siretZodObject} from "@infrastructureCore/requests/inventoryManagement/siretRequest";

export const updateMaintenanceRequest = z.object({
    maintenanceId:  z.string().uuid(),
    ...siretZodObject,
    status: z.nativeEnum(MaintenanceStatusEnum),
    recommendation: z.string().max(255),
    maintenanceSpareParts: z.array(z.object({
        unitPrice: stringToNumber,
        quantity: stringToNumber,
        sparePartReference: z.string().min(1).max(255),
    })),
})