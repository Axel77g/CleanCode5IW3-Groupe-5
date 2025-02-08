import { z} from 'zod';
import { stringToNumber } from "@infrastructureCore/requests/stringToNumber";
import { dateParser } from "@infrastructureCore/requests/dateParser";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";

export const updateVehiculeRequest = z.object({
    immatriculation: z.string(),
    mileage: stringToNumber.optional(),
    maintenanceInterval: z.object({
        duration: stringToNumber,
        mileage: stringToNumber,
        lastMaintenance: z.object({
            date: dateParser,
            mileage: stringToNumber ,
        })
    }).optional(),
    status: z.nativeEnum(VehiculeStatusEnum).optional(),
});
