import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";
import { Siret } from "@domain/shared/value-object/Siret";
import { VoidResult, Result, OptionalResult } from "@shared/Result";

export class InMemoryOrderRepository extends AbstractInMemoryRepository<Order> implements OrderRepository {
    async store(order: Order): Promise<VoidResult> {
        this.collection.add(order);
        return Result.SuccessVoid();
    }
    async findOrdersByDealer(siret: Siret): Promise<Result<Order[]>> {
        const dealerOrders = this.collection.findMany('siret', siret)
        return Result.Success(dealerOrders.toArray());
    }
    async findOrderById(orderId: string): Promise<OptionalResult<Order>> {
        const order = this.collection.findOne('orderId', orderId);
        return order ? Result.Success(order) : Result.SuccessVoid();
    }
    async deleteOrdersByDealerSiret(siret: Siret): Promise<VoidResult> {
        this.collection.remove('siret', siret);
        return Result.SuccessVoid();
    }

}