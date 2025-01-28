import { siretZodObject } from "@infrastructureCore/requests/inventoryManagement/siretRequest";
import { z } from 'zod';
import { dateParser } from "../dateParser";

export const registerVehiculeRequest = z.object({
    immatriculation: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    vin: z.string(),
    mileage: z.number(),
    maintenanceDate: dateParser,
    status: z.string()
})