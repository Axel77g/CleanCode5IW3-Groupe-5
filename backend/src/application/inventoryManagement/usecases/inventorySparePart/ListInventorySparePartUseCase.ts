import {IUseCase} from "@shared/IUseCase";
import {PaginatedResult, Result} from "@shared/Result";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {PaginatedInput} from "@shared/PaginatedInput";

type ListInventorySparePartResult = PaginatedResult<InventorySparePart>

export type ListInventorySparePartUseCase = IUseCase<PaginatedInput, ListInventorySparePartResult>
export const createListInventorySparePartUseCase = (_sparePartRepository: InventorySparePartRepository): ListInventorySparePartUseCase => {
    return async (input: PaginatedInput) => {
        const listSparePartResponse = await _sparePartRepository.list(input);
        if(!listSparePartResponse.success) return Result.FailureStr("An error occurred while listing spare part")
        return listSparePartResponse;
    }
}

