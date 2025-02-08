
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";

interface ChecksSparesPartsReferencesExistInput extends IInputUseCase {
    spareParts: {
        sparePartReference: string
    }[],
}

export type CheckSparesPartsReferencesExistUseCase = IUseCase<ChecksSparesPartsReferencesExistInput, Result<boolean>>;

export const createCheckSparesPartsReferenceExist = (_inventorySparePartRepository : InventorySparePartRepository): CheckSparesPartsReferencesExistUseCase => {
    return async (input: ChecksSparesPartsReferencesExistInput) => {
        const sparePartReferences = input.spareParts.map(sparePart => sparePart.sparePartReference);
        const sparePartsResponse = await _inventorySparePartRepository.findAll(sparePartReferences);
        if (!sparePartsResponse.success) return sparePartsResponse;
        const missingReferences = sparePartReferences.filter(ref => !sparePartsResponse.value.some(sp => sp.reference === ref));
        return Result.Success(missingReferences.length == 0)
    }
}