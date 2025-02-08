import { z } from "zod";
import {customerIdZodObject} from "@infrastructureCore/requests/maintenance/customer/customerIdRequest";

export const updateCustomerRequest = z.object({
    ...customerIdZodObject,
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
})