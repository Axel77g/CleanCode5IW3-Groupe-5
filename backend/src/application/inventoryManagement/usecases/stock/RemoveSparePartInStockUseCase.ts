import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {NotificationServices} from "@application/shared/services/NotificationServices";
import {StockRepository} from "@application/inventoryManagement/repositories/StockRepository";
import {StockInventorySparePart} from "@domain/inventoryManagement/value-object/StockInventorySparePart";

interface RemoveSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePartReference: string,
    quantity: number
}

export type RemoveSparePartInStockUseCase = IUseCase<RemoveSparePartInStockInput, Result>

const removeSparePartInStockErrors = {
    DEALER_STOCK_NOT_FOUND: NotFoundEntityException.create("Dealer stock not found"),
    STOCK_RUN_OUT: new ApplicationException("RemoveSparePartInStockUseCase.StockRunOut", "Stock run out"),
}
export const createRemoveSparePartInStockUseCase = (
    _eventRepository : EventRepository,
    _stockRepository: StockRepository,
    _inventorySparePartRepository : InventorySparePartRepository ,
    _notificationService: NotificationServices
): RemoveSparePartInStockUseCase => {
    return async (input: RemoveSparePartInStockInput) => {
        const sparePartResponse = await _inventorySparePartRepository.find(input.sparePartReference);
        if(!sparePartResponse.success) return sparePartResponse;
        if(sparePartResponse.empty) return Result.Failure(removeSparePartInStockErrors.DEALER_STOCK_NOT_FOUND)

        const stockQuantityResponse = await _stockRepository.getStockQuantity(sparePartResponse.value, input.siret);
        if (!stockQuantityResponse.success) return Result.Failure(removeSparePartInStockErrors.DEALER_STOCK_NOT_FOUND)

        const stock = StockInventorySparePart.create({
            siret: input.siret,
            sparePartReference: sparePartResponse.value.reference,
            quantity: stockQuantityResponse.value
        });
        if(stock instanceof ApplicationException) return Result.Failure(stock);

        const response = stock.remove(input.quantity);
        if(response instanceof ApplicationException) return Result.Failure(response);
        const removeResponse = await _eventRepository.storeEvent(response.event);
        if (!removeResponse.success) return removeResponse;

        if (stock.needToNotifyLowStock()) _notificationService.notifyLowStock(stock.siret, sparePartResponse.value)

        return Result.Success("Spare part removed from stock successfully")
    }
}