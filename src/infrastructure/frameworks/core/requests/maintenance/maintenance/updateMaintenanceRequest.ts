import {z} from "zod";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";

export const updateMaintenanceRequest = z.object({
    maintenanceId:  z.string().uuid(),
    siret : z.string().nullable(),
    status: z.nativeEnum(MaintenanceStatusEnum).optional(),
    recommendation: z.string().max(255).optional(),
    maintenanceSpareParts: z.array(z.object({
        unitPrice: stringToNumber,
        quantity: stringToNumber,
        sparePartReference: z.string().min(1).max(255),
    })).optional(),
})