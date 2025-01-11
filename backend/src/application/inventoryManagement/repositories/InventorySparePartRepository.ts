import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {IRepository} from "@shared/IRepository";
import {Result, VoidResult} from "@shared/Result";

export interface InventorySparePartRepository extends IRepository{
    find(reference: string): Promise<Result<InventorySparePart>>
    store(inventorySparePart: InventorySparePart): Promise<VoidResult>
}