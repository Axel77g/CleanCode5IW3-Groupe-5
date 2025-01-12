import {z} from "zod";

export const sparePArtReferenceZodObject = {
    reference: z.string().min(1).max(255)
}

export const sparePartReferenceRequest = z.object(sparePArtReferenceZodObject)