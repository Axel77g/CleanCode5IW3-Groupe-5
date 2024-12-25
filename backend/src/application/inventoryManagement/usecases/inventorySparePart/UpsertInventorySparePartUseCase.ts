import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {InventorySparePartRepository} from "../../repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {GetInventorySparePartUseCase} from "./GetInventorySparePartUseCase";
import {Result} from "../../../../shared/Result";

interface UpsertInventorySparePartInput extends IInputUseCase{
    reference: string,
    name: string
}

export type UpsertInventorySparePartUseCase = IUseCase<UpsertInventorySparePartInput, Result>
export const upsertInventorySparePartUseCase = (
    _sparePartRepository: InventorySparePartRepository,
    _getInventorySparePartUseCase: GetInventorySparePartUseCase
): UpsertInventorySparePartUseCase => {

    return async (input: UpsertInventorySparePartInput) => {
        const spartResponse = await _getInventorySparePartUseCase({reference: input.reference});
        if(spartResponse.success){
            const updatedSparePart = spartResponse.value.setName(input.name);
            const updateResponse = await _sparePartRepository.update(updatedSparePart);
            if(!updateResponse.success) return Result.FailureStr("Cannot update spare part, an error occurred while updating")
        }else{
            const sparePart = new InventorySparePart(input.reference, input.name);
            const createResponse = await _sparePartRepository.create(sparePart);
            if(!createResponse.success) return Result.FailureStr("Cannot create spare part, an error occurred while creating")
        }
        return Result.Success("Spare part upserted successfully")
    }

}