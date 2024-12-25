import {IRepository} from "../../../shared/IRepository";
import {InventorySparePart} from "../../../domain/inventoryManagement/entities/InventorySparePart";
import {DealerSiret} from "../../../domain/inventoryManagement/value-object/DealerSiret";
import {StockInventorySparePart} from "../../../domain/inventoryManagement/value-object/StockInventorySparePart";
import {Result, VoidResult} from "../../../shared/Result";

export interface StockRepository extends IRepository{
    add(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<VoidResult>
    remove(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<VoidResult>
    getStock(dealerSiret: DealerSiret): Promise<Result<StockInventorySparePart[]>>
    getStockQuantity(sparePart: InventorySparePart, dealerSiret: DealerSiret): Promise<Result<number>>
}