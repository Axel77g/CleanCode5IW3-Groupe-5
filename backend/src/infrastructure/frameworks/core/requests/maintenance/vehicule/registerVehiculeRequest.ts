import { z } from 'zod';
import { dateParser } from "../../dateParser";
import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from '@domain/maintenance/enums/VehiculeStatusEnum';
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";

export const registerVehiculeRequest = z.object({
    immatriculation: z.string(),
    model: z.nativeEnum(VehiculeModelEnum),
    year: stringToNumber,
    vin: z.string(),
    mileage: stringToNumber,
    maintenanceInterval: z.object({
        mileage: stringToNumber,
        duration: stringToNumber,
        lastMaintenance: z.object({
            date: dateParser,
            mileage: stringToNumber,
        }).optional(),
    }),
    status: z.nativeEnum(VehiculeStatusEnum),
    warranty: z.object({
        startDate: dateParser,
        endDate: dateParser,
    }),
});
