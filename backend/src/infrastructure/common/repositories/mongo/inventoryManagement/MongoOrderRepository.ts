import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";
import {Result, VoidResult} from "@shared/Result";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {Siret} from "@domain/shared/value-object/Siret";

export class MongoOrderRepository extends AbstractMongoRepository implements OrderRepository {
    protected collectionName: string = 'orders';

    findOrderById(orderId: string): Promise<Result<Order>> {
        return this.catchError<Result<Order>>(
            async () => {
                const orderDocument = await this.getCollection().findOne({ orderId: orderId });
                if (!orderDocument) return Result.FailureStr("Order not found");
                const order = Order.fromObject(orderDocument as any);
                if (order instanceof Error) return Result.Failure(order);
                return Result.Success<Order>(order);
            }
        )
    }

    findOrdersByDealer(siret: Siret): Promise<Result<Order[]>> {
        return this.catchError<Result<Order[]>>(
            async () => {
                const orderDocuments = await this.getCollection().find({ siret: siret.getValue() }).toArray();
                const orders = orderDocuments.map(orderDocument => Order.fromObject(orderDocument as any));
                const error = orders.find(order => order instanceof Error);
                if (error) return Result.Failure(error as Error);
                return Result.Success<Order[]>(orders as Order[]);
            }
        )
    }

    store(order: Order): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError<VoidResult>(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ orderId: order.orderId }, {
                    $set: {
                        ...order,
                        siret: order.siret.getValue(),
                    }
                }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

}