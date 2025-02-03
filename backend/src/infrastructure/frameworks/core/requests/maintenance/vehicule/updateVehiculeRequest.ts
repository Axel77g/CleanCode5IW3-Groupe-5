import {z} from 'zod';

export const updateVehiculeRequest = z.object({
    mileage: z.number(),
    maintenanceInterval: z.object({
        date: z.date(),
        mileage: z.number(),
        lastMaintenance: z.object({
            date: z.date(),
            mileage: z.number()
        })
    })
})