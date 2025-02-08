import {z} from 'zod';

export const vehicleBreakdownIdRequest = z.object({
    vehicleBreakdownId: z.string()
})