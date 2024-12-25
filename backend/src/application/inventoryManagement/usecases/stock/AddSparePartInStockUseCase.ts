import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {StockRepository} from "../../repositories/StockRepository";
import {GetInventorySparePartUseCase} from "../inventorySparePart/GetInventorySparePartUseCase";
import {Result} from "../../../../shared/Result";

interface AddSparePartInStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
    sparePart: InventorySparePart,
    quantity: number
}

export type AddSparePartInStockUseCase = IUseCase<AddSparePartInStockInput, Result>
export const addSparePartInStockUseCase = (_stockRepository: StockRepository, _getInventorySparePartUseCase: GetInventorySparePartUseCase): AddSparePartInStockUseCase => {
    return async (input: AddSparePartInStockInput) => {
        const sparePartResponse = await _getInventorySparePartUseCase({reference: input.sparePart.reference});
        if(!sparePartResponse.success) return Result.FailureStr("Spare part not found");
        const addResponse = await _stockRepository.add(input.sparePart, input.dealerSiret, input.quantity);
        if(!addResponse.success) return Result.FailureStr("Cannot add spare part in stock, an error occurred while adding");
        return Result.Success("Spare part added in stock successfully")
    }
}