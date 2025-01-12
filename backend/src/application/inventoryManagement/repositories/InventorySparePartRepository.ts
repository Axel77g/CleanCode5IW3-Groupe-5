import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {IRepository} from "@shared/IRepository";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";

export interface InventorySparePartRepository extends IRepository{
    list(pagination : PaginatedInput) : Promise<PaginatedResult<InventorySparePart>>
    find(reference: string): Promise<Result<InventorySparePart>>
    store(inventorySparePart: InventorySparePart): Promise<VoidResult>
}