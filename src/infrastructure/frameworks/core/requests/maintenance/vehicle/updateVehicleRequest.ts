import { z} from 'zod';
import { stringToNumber } from "@infrastructureCore/requests/stringToNumber";
import { dateParser } from "@infrastructureCore/requests/dateParser";
import {VehicleStatusEnum} from "@domain/maintenance/enums/VehicleStatusEnum";

export const updateVehicleRequest = z.object({
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
    status: z.nativeEnum(VehicleStatusEnum).optional(),
});
