import {z} from "zod";
import {sparePartReferenceZodObject} from "@infrastructureCore/requests/inventoryManagement/sparePartReferenceRequest";

export const sparePartRequest = z.object({
    ...sparePartReferenceZodObject,
    name: z.string().min(2,"Le nom du produit doit être supérieur à 2 caractères"
    ).max(255,"Le nom du produit doit être compris entre 1 et 255 caractères"),
})