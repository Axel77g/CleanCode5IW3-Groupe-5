import { z } from 'zod';
import { dateParser } from "../../dateParser";
import { VehicleModelEnum } from "@domain/maintenance/enums/VehicleModelEnum";
import { VehicleStatusEnum } from '@domain/maintenance/enums/VehicleStatusEnum';
import {stringToNumber} from "@infrastructureCore/requests/stringToNumber";

export const registerVehicleRequest = z.object({
    immatriculation: z.string(),
    model: z.nativeEnum(VehicleModelEnum,{message: "Invalid Model"}),
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
    status: z.nativeEnum(VehicleStatusEnum, {message: "Invalid status"}),
    warranty: z.object({
        startDate: dateParser,
        endDate: dateParser,
    }),
});
