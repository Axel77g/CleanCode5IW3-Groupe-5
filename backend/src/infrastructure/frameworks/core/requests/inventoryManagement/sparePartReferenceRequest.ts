import {z} from "zod";

export const sparePartReferenceZodObject = {
    reference: z.string().min(5,"La référence du produit doit être supérieur à 5 caractères").max(255 ,"La référence du produit doit être compris entre 1 et 255 caractères"),
}

export const sparePartReferenceRequest = z.object(sparePartReferenceZodObject)