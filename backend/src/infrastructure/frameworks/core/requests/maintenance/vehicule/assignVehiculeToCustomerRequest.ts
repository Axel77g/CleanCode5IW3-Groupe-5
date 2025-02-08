import { z } from "zod";

export const assignVehiculeToCustomerRequest = z.object({
    customerId: z.string(),
    vehiculeImmatriculation: z.string(),
})