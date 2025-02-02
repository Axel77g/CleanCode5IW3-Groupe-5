import { VehiculeStatusEnum } from '@domain/maintenance/enums/VehiculeStatusEnum';
import { z } from 'zod';
import { dateParser } from "../../dateParser";

export const registerVehiculeRequest = z.object({
    immatriculation: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    vin: z.string(),
    mileage: z.number(),
    maintenanceDate: dateParser,
    status: z.nativeEnum(VehiculeStatusEnum),
    warranty: z.object({
        start: dateParser,
        end: dateParser,
    })
})