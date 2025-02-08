import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {Result} from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";

interface GetInventorySparePartInput extends IInputUseCase{
    reference: string,
}
type GetInventorySparePartResult = Result<InventorySparePart>

export type GetInventorySparePartUseCase = IUseCase<GetInventorySparePartInput, GetInventorySparePartResult>
export const createGetInventorySparePartUseCase = (_sparePartRepository: InventorySparePartRepository): GetInventorySparePartUseCase => {
    return async (input: GetInventorySparePartInput) => {
        const findSparePartResponse = await _sparePartRepository.find(input.reference);
        if(!findSparePartResponse.success) return findSparePartResponse;
        if(findSparePartResponse.empty) return Result.Failure(NotFoundEntityException.create("Spare part not found"));
        return findSparePartResponse;
    }
}

