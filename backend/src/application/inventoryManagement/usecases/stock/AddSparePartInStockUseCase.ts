import { InventorySparePart } from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { StockRepository } from "../../repositories/StockRepository";
import { GetInventorySparePartUseCase } from "../inventorySparePart/GetInventorySparePartUseCase";

interface AddSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePart: InventorySparePart,
    quantity: number
}

export type AddSparePartInStockUseCase = IUseCase<AddSparePartInStockInput, Result>
export const addSparePartInStockUseCase = (_stockRepository: StockRepository, _getInventorySparePartUseCase: GetInventorySparePartUseCase): AddSparePartInStockUseCase => {
    return async (input: AddSparePartInStockInput) => {
        const sparePartResponse = await _getInventorySparePartUseCase({ reference: input.sparePart.reference });
        if (!sparePartResponse.success) return Result.FailureStr("Spare part not found");
        const addResponse = await _stockRepository.add(input.sparePart, input.siret, input.quantity);
        if (!addResponse.success) return Result.FailureStr("Cannot add spare part in stock, an error occurred while adding");
        return Result.Success("Spare part added in stock successfully")
    }
}