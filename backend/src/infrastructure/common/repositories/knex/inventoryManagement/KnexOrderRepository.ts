import { OrderRepository } from "../../../../../application/inventoryManagement/repositories/OrderRepository";
import { InventorySparePart } from "../../../../../domain/inventoryManagement/entities/InventorySparePart";
import { Order } from "../../../../../domain/inventoryManagement/entities/Order";
import { OrderLine } from "../../../../../domain/inventoryManagement/value-object/OrderLine";
import { Siret } from '../../../../../domain/shared/value-object/Siret';
import { Result, VoidResult } from "../../../../../shared/Result";
import { AbstractKnexRepository } from "../AbstractKnexRepository";

export class KnexOrderRepository extends AbstractKnexRepository implements OrderRepository {
    protected tableName: string = "orders";
    protected orderLinesTableName: string = "order_lines";
    protected sparePartsTableName: string = "spare_parts";

    async findOrdersByDealer(siret: Siret): Promise<Result<Order[]>> {
        try {
            // @ts-ignore
            const ordersWithSpartParts = await this.getQuery()
                .select(
                    'orders.*',
                    'order_lines.spare_part_reference',
                    'order_lines.quantity',
                    'order_lines.unit_price as unit_price',
                    'spare_parts.name as spare_part_name'
                ).from(this.tableName)
                .leftJoin(this.orderLinesTableName, `${this.tableName}.id`, `${this.orderLinesTableName}.order_id`)
                .leftJoin(this.sparePartsTableName, `${this.orderLinesTableName}.spare_part_reference`, `${this.sparePartsTableName}.reference`)
                .where('dealer_siret', siret.getValue()) as any[];

            const orders = ordersWithSpartParts.reduce((acc, order) => {
                const existingOrder = acc.find((o: { id: number }) => o.id === order.id);
                const sparePart = new InventorySparePart(order.spare_part_reference, order.spare_part_name);
                const orderLine = new OrderLine(sparePart, order.quantity, order.unit_price);

                if (existingOrder) {
                    existingOrder.lines.push(orderLine);
                } else {
                    acc.push({
                        ...order,
                        lines: [orderLine]
                    });
                }
                return acc;
            }, []);

            const results = orders.map((order: any) => {
                return new Order(
                    order.id,
                    new Date(order.orderedAt),
                    new Date(order.deliveredAt),
                    siret,
                    order.lines
                );
            });

            return Result.Success<Order[]>(results);
        } catch (e) {
            console.error(e);
            return Result.FailureStr("An error occurred while getting orders");
        }
    }

    async store(order: Order): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try {
            await transaction(this.tableName).insert({
                id: order.id,
                orderedAt: order.orderedAt,
                siret: order.siret.getValue()
            });

            for (const orderLine of order.lines) {
                await transaction(this.orderLinesTableName).insert({
                    order_id: order.id,
                    spare_part_reference: orderLine.sparePart.reference, //if foreign key is not respected, it will throw an error
                    quantity: orderLine.quantity
                });
            }

            transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            transaction.rollback();
            console.error(e);
            return Result.FailureStr("An error occurred while storing order");
        }
    }
}