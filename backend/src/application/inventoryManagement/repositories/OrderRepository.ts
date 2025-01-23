import { Order } from "@domain/inventoryManagement/entities/Order";
import { Siret } from '@domain/shared/value-object/Siret';
import { Result, VoidResult } from "@shared/Result";


export interface OrderRepository {
    store(order: Order): Promise<VoidResult>
    findOrdersByDealer(siret: Siret): Promise<Result<Order[]>>
    findOrderById(orderId: string): Promise<Result<Order>>
}