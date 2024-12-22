import {IRepository, AbstractRepositoryResponse} from "../../../shared/IRepository";
import {InventorySparePart} from "../../../domain/inventoryManagement/entities/InventorySparePart";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";
import {StockInventorySparePart} from "../../../domain/inventoryManagement/value-object/StockInventorySparePart";

export interface StockRepository extends IRepository{
    add(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<AbstractRepositoryResponse<void>>
    remove(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<AbstractRepositoryResponse<void>>
    getStock(dealerSiret: DealerSiret): Promise<AbstractRepositoryResponse<StockInventorySparePart[]>>
    getStockQuantity(sparePart: InventorySparePart, dealerSiret: DealerSiret): Promise<AbstractRepositoryResponse<number>>
}