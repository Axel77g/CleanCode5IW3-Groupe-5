import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {OrderRepository} from "../../../../application/inventoryManagement/repositories/OrderRepository";
import {AbstractRepositoryResponse} from "../../../../shared/IRepository";
import {Order} from "../../../../domain/inventoryManagement/entities/Order";
import {KnexRepositoryResponse} from "../KnexRepositoryResponse";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {OrderLine} from "../../../../domain/inventoryManagement/value-object/OrderLine";

export class KnexOrderRepository extends AbstractKnexRepository implements OrderRepository{
    protected tableName: string = "orders";
    protected orderLinesTableName: string = "order_lines";
    protected sparePartsTableName: string = "spare_parts";

    async findOrdersByDealer(dealerSiret: DealerSiret): Promise<AbstractRepositoryResponse<Order[]>> {
        try{
            // @ts-ignore
            const ordersWithSpartParts = await this.getQuery()
                .select(
                    'orders.*',
                    'order_lines.spare_part_reference',
                    'order_lines.quantity',
                    'order_lines.unit_price as unit_price',
                    'spare_parts.name as spare_part_name'
                ).from(this.tableName)
                .leftJoin(this.orderLinesTableName,  `${this.tableName}.id`, `${this.orderLinesTableName}.order_id`)
                .leftJoin(this.sparePartsTableName, `${this.orderLinesTableName}.spare_part_reference`, `${this.sparePartsTableName}.reference`)
                .where('dealer_siret', dealerSiret.getValue()) as any[];

            const orders = ordersWithSpartParts.reduce((acc, order) => {
                const existingOrder = acc.find(o => o.id === order.id);
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


            return new KnexRepositoryResponse<Order[]>(orders);
        }catch (e){
            return new KnexRepositoryResponse<Order[]>([], true);
        }
    }

    async store(order: Order): Promise<AbstractRepositoryResponse<void>> {
        const transaction = await this.connection.transaction();
        try{
            await transaction(this.tableName).insert({
                id: order.id,
                orderedAt: order.orderedAt,
                dealer_siret: order.dealer.siret.getValue()
            });

            for(const orderLine of order.lines){
                await transaction(this.orderLinesTableName).insert({
                    order_id: order.id,
                    spare_part_reference: orderLine.sparePart.reference, //if foreign key is not respected, it will throw an error
                    quantity: orderLine.quantity
                });
            }

            transaction.commit();
            return new KnexRepositoryResponse<void>(undefined, false);
        }catch (e){
            transaction.rollback();
            return new KnexRepositoryResponse<void>(undefined, true);
        }
    }
}