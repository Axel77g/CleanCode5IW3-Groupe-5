import {Order} from "@domain/inventoryManagement/entities/Order";
import {OptionalResult, Result, VoidResult} from "@shared/Result";
import { Siret } from '@domain/shared/value-object/Siret';

export interface OrderRepository {
    store(order : Order) : Promise<VoidResult>
    findOrdersByDealer(siret: Siret) : Promise<Result<Order[]>>
    findOrderById(orderId: string) : Promise<OptionalResult<Order>>
    deleteOrdersByDealerSiret(siret: Siret) : Promise<VoidResult>
}