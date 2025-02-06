import { z } from 'zod';
import { stringToNumber } from "@infrastructureCore/requests/stringToNumber";
import { dateParser } from "@infrastructureCore/requests/dateParser";

export const updateVehiculeRequest = z.object({
    immatriculation: z.string(),
    mileage: stringToNumber.optional(),
    // maintenanceInterval: z.object({
    //     duration: dateParser,
    //     mileage: stringToNumber,
    //     lastMaintenance: z.object({
    //         date: dateParser,
    //         mileage: stringToNumber ,
    //     }).optional(),
    // }).optional(),
    status: z.string().optional(),
});
