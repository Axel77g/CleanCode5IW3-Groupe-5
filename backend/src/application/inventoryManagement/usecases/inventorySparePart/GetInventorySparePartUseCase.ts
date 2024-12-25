import {IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {InventorySparePartRepository} from "../../repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {Result} from "../../../../shared/Result";

interface GetInventorySparePartInput extends IInputUseCase{
    reference: string,
}

type GetInventorySparePartResult = Result<InventorySparePart>

export type GetInventorySparePartUseCase = IUseCase<GetInventorySparePartInput, GetInventorySparePartResult>
export const getInventorySparePartUseCase = (_sparePartRepository: InventorySparePartRepository): GetInventorySparePartUseCase => {
    return async (input: GetInventorySparePartInput) => {
        const findSparePartResponse = await _sparePartRepository.find(input.reference);
        if(!findSparePartResponse.success) return Result.FailureStr("An error occurred while finding spare part")
        return findSparePartResponse;
    }
}

