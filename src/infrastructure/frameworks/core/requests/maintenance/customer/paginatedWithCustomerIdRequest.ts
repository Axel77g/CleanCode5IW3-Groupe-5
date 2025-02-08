import {paginatedZodObject} from "@infrastructureCore/requests/paginatedRequest";
import {z} from "zod";
import {customerIdZodObject} from "@infrastructureCore/requests/maintenance/customer/customerIdRequest";

export const paginatedWithCustomerIdRequest = z.object({
    ...customerIdZodObject,
    ...paginatedZodObject
})