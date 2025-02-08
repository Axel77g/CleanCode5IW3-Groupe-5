import {z} from "zod";
import {sparePartReferenceZodObject} from "@infrastructureCore/requests/inventoryManagement/sparePartReferenceRequest";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

export const sparePartRequest = z.object({
    ...sparePartReferenceZodObject,
    name: z.string().min(InventorySparePart.NAME_MIN_LENGTH,`Le nom du produit doit être supérieur à ${InventorySparePart.NAME_MIN_LENGTH} caractères`
    ).max(255,"Le nom du produit doit être compris entre 1 et 255 caractères"),
})