import { z } from 'zod';
import { stringToNumber } from "@infrastructureCore/requests/stringToNumber";
import { dateParser } from "@infrastructureCore/requests/dateParser";

export const updateVehiculeRequest = z.object({
    immatriculation: z.string(),
    mileage: stringToNumber.optional(),
    maintenanceInterval: z.object({
        duration: dateParser,
        mileage: stringToNumber,
        lastMaintenance: z.object({
            date: dateParser.optional(),
            mileage: stringToNumber.optional(),
        }).optional(),
    }).optional(),
    warranty: z.object({
        periodStart: dateParser,
        periodEnd: dateParser,
    }),
    status: z.string().optional(),
});
