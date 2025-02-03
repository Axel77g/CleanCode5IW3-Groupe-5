import {z} from "zod";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";

export const updateMaintenanceRequest = z.object({
    status: z.nativeEnum(MaintenanceStatusEnum),
    recommendation: z.string().max(255),
})