import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {OrderRepository} from "@application/inventoryManagement/repositories/OrderRepository";
import {OptionalResult, Result, VoidResult} from "@shared/Result";
import {Order} from "@domain/inventoryManagement/entities/Order";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";

export class MongoOrderRepository extends AbstractMongoRepository implements OrderRepository {
    protected collectionName: string = 'orders';

    findOrderById(orderId: string): Promise<OptionalResult<Order>> {
       return this.catchError(
           async () => {
                const orderDocument = await this.getCollection().findOne({orderId: orderId});
                if(!orderDocument) return Result.SuccessVoid();
                const order = Order.fromObject(orderDocument as any);
                if (order instanceof ApplicationException) return Result.Failure(order);
                return Result.Success<Order>(order);
            }
        )
    }

    findOrdersByDealer(siret: Siret): Promise<Result<Order[]>> {
        return this.catchError<Result<Order[]>>(
            async () => {
                const orderDocuments = await this.getCollection().find({ siret: siret.getValue() }).toArray();
                const orders = orderDocuments.map(orderDocument => Order.fromObject(orderDocument as any));
                const error = orders.find(order => order instanceof ApplicationException);
                if(error) return Result.Failure(error as ApplicationException);
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

    deleteOrdersByDealerSiret(siret: Siret): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError<VoidResult>(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteMany({siret: siret.getValue()});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

}