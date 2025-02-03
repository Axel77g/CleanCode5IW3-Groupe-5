import {z} from 'zod';

export const vehiculeBreakdownIdRequest = z.object({
    vehiculeBreakdownId: z.string()
})