import {z} from "zod";
import {DriverDocumentsTypes} from "@domain/testDrive/enums/DriverDocumentsTypes";

export const putDriverDocumentsRequest = z.object({
    driverLicenseId: z.string(),
    documents: z.array(z.object({
        name: z.string(),
        type: z.nativeEnum(DriverDocumentsTypes, {message: 'Invalid document type'}),
        description: z.string(),
        hash: z.string().optional(),
        extension: z.string().optional()
    }))
})