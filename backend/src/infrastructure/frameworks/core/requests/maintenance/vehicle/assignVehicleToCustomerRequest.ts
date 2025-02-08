import { z } from "zod";

export const assignVehicleToCustomerRequest = z.object({
    customerId: z.string(),
    vehicleImmatriculation: z.string(),
})