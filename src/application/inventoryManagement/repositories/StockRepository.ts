import {IRepository} from "@shared/IRepository";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import {StockInventorySparePart} from "@domain/inventoryManagement/value-object/StockInventorySparePart";
import {Result, VoidResult} from "@shared/Result";

export interface StockRepository extends IRepository{
    update(sparePart: InventorySparePart, siret: Siret, quantity: number): Promise<VoidResult>
    getStock(siret: Siret): Promise<Result<StockInventorySparePart[]>>
    getStockQuantity(sparePart: InventorySparePart, siret: Siret): Promise<Result<number>>
    deleteByDealerSiret(siret: Siret): Promise<VoidResult>
}