import {z} from "zod";
import {sparePArtReferenceZodObject} from "@expressApp/requests/inventoryManagement/sparePartReferenceRequest";

export const sparePartRequest = z.object({
    ...sparePArtReferenceZodObject,
    name: z.string().min(1).max(255)
})