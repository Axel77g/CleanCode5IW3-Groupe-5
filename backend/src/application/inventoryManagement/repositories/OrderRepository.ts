import {Order} from "../../../domain/inventoryManagement/entities/Order";
import {Result, VoidResult} from "../../../shared/Result";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";

export interface OrderRepository {
    store(order : Order) : Promise<VoidResult>
    findOrdersByDealer(dealerSiret: DealerSiret) : Promise<Result<Order[]>>
}