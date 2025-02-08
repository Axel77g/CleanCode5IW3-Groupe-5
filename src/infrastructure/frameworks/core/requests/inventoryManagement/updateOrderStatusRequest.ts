import {z} from "zod";
import {OrderStatusEnum} from "@domain/inventoryManagement/enums/OrderStatusEnum";

export const updateOrderStatusRequest = z.object({
        orderId: z.string().min(1).max(255),
        status: z.nativeEnum(OrderStatusEnum)
})