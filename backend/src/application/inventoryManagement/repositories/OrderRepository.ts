import {Order} from "../../../domain/inventoryManagement/entities/Order";
import {Dealer} from "../../../domain/inventoryManagement/entities/Dealer";
import {AbstractRepositoryResponse} from "../../../shared/IRepository";

export interface OrderRepository {
    store(order : Order) : Promise<AbstractRepositoryResponse<void>>
    findOrdersByDealer(dealerSiret: Dealer) : Promise<AbstractRepositoryResponse<Order[]>>
}