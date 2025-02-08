import {z} from "zod";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

export const sparePartReferenceZodObject = {
    reference: z.string().min(InventorySparePart.REFERENCE_MIN_LENGTH,`La référence du produit doit être supérieur à ${InventorySparePart.REFERENCE_MIN_LENGTH} caractères`).max(255 ,"La référence du produit doit être compris entre 1 et 255 caractères"),
}

export const sparePartReferenceRequest = z.object(sparePartReferenceZodObject)