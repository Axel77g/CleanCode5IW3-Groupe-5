import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {IRepository} from "@shared/IRepository";
import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import {
    ListInventorySparePartInput
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";

export interface InventorySparePartRepository extends IRepository{
    list(pagination : ListInventorySparePartInput) : Promise<PaginatedResult<InventorySparePart>>
    find(reference: string): Promise<OptionalResult<InventorySparePart>>
    store(inventorySparePart: InventorySparePart): Promise<VoidResult>
}