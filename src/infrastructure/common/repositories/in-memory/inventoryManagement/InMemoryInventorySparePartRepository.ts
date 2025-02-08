import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import { ListInventorySparePartInput } from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";
import { PaginatedResult, OptionalResult, VoidResult, Result } from "@shared/Result";

export class InMemoryInventorySparePartRepository extends AbstractInMemoryRepository<InventorySparePart> implements InventorySparePartRepository {
    async list(pagination: ListInventorySparePartInput): Promise<PaginatedResult<InventorySparePart>> {
        const {page, limit} = pagination;
        const inventorySpareParts = this.collection.paginate(page, limit).toArray();
        const total = this.collection.count();
        return Promise.resolve(Result.SuccessPaginated(inventorySpareParts, total, page, limit));
    }
    async find(reference: string): Promise<OptionalResult<InventorySparePart>> {
        const inventorySparePart = this.collection.findOne('reference', reference);
        return inventorySparePart ? Result.Success(inventorySparePart) : Result.SuccessVoid();
    }
    async store(inventorySparePart: InventorySparePart): Promise<VoidResult> {
        this.collection.add(inventorySparePart);
        return Result.SuccessVoid();
    }
    async findAll(references: string[]): Promise<Result<InventorySparePart[]>> {
        const inventorySpareParts = this.collection
            .filter(inventorySparePart => references.includes(inventorySparePart.reference))
            .toArray();
        return Result.Success(inventorySpareParts);
    }

}