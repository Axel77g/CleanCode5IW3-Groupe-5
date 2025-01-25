import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {IRepository} from "@shared/IRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {
    ListInventorySparePartInput
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";

export interface InventorySparePartRepository extends IRepository{
    list(pagination : ListInventorySparePartInput) : Promise<PaginatedResult<InventorySparePart>>
    find(reference: string): Promise<OptionalResult<InventorySparePart>>
    store(inventorySparePart: InventorySparePart): Promise<VoidResult>
    findAll(references: string[]): Promise<Result<InventorySparePart[]>>
}