import {InventorySparePart} from "../../../domain/inventoryManagement/entities/InventorySparePart";
import {IRepository, AbstractRepositoryResponse} from "../../../shared/IRepository";

export interface InventorySparePartRepository extends IRepository{
    find(reference: string): Promise<AbstractRepositoryResponse<InventorySparePart>>
    update(inventorySparePart: InventorySparePart): Promise<AbstractRepositoryResponse<void>>
    create(inventorySparePart: InventorySparePart): Promise<AbstractRepositoryResponse<void>>
}