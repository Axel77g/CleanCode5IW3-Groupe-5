import { InventorySparePart } from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '../../../../domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "../../../../shared/IUseCase";
import { Result } from "../../../../shared/Result";
import { StockRepository } from "../../repositories/StockRepository";
import { NotificationServices } from "../../services/NotificationServices";

interface RemoveSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePart: InventorySparePart,
    quantity: number
}

export type RemoveSparePartInStockUseCase = IUseCase<RemoveSparePartInStockInput, Result>
export const removeSparePartInStockUseCase = (_stockRepository: StockRepository, _notificationService: NotificationServices): RemoveSparePartInStockUseCase => {
    return async (input: RemoveSparePartInStockInput) => {
        const stockQuantityResponse = await _stockRepository.getStockQuantity(input.sparePart, input.siret);
        if (!stockQuantityResponse.success) return Result.FailureStr("Stock not found")

        const stockQuantity = stockQuantityResponse.value;
        if (stockQuantity < input.quantity) return Result.FailureStr("Stock run out")

        const removeResponse = await _stockRepository.remove(input.sparePart, input.siret, input.quantity);
        if (!removeResponse.success) return Result.FailureStr("Cannot remove spare part from stock, an error occurred while removing")

        const newStockQuantity = stockQuantity - input.quantity;
        if (newStockQuantity === 5) _notificationService.notifyLowStock(input.siret, input.sparePart)

        return Result.Success("Spare part removed from stock successfully")
    }
}