import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {IRepository} from "@shared/IRepository";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {
    ListInventorySparePartInput
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";

export interface InventorySparePartRepository extends IRepository{
    list(pagination : ListInventorySparePartInput) : Promise<PaginatedResult<InventorySparePart>>
    find(reference: string): Promise<Result<InventorySparePart>>
    store(inventorySparePart: InventorySparePart): Promise<VoidResult>
}