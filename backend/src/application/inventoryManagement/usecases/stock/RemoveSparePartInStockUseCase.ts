import { IInputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {StockRepository} from "../../repositories/StockRepository";
import {NotificationServices} from "../../services/NotificationServices";
import {Result} from "../../../../shared/Result";

interface RemoveSparePartInStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
    sparePart: InventorySparePart,
    quantity: number
}

export type RemoveSparePartInStockUseCase = IUseCase<RemoveSparePartInStockInput, Result>
export const removeSparePartInStockUseCase = (_stockRepository: StockRepository, _notificationService: NotificationServices): RemoveSparePartInStockUseCase => {
    return async (input: RemoveSparePartInStockInput) => {
        const stockQuantityResponse = await _stockRepository.getStockQuantity(input.sparePart, input.dealerSiret);
        if(!stockQuantityResponse.success) return Result.FailureStr("Stock not found")

        const stockQuantity = stockQuantityResponse.value;
        if(stockQuantity < input.quantity) return Result.FailureStr("Stock run out")

        const removeResponse = await _stockRepository.remove(input.sparePart, input.dealerSiret, input.quantity);
        if(!removeResponse.success) return Result.FailureStr("Cannot remove spare part from stock, an error occurred while removing")

        const newStockQuantity = stockQuantity - input.quantity;
        if(newStockQuantity === 5) _notificationService.notifyLowStock(input.dealerSiret, input.sparePart)

        return Result.Success("Spare part removed from stock successfully")
    }
}