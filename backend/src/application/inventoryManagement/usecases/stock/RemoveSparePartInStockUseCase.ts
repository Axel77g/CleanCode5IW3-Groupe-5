import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { StockRepository } from "../../repositories/StockRepository";
import { NotificationServices } from "../../services/NotificationServices";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";

interface RemoveSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePartReference: string,
    quantity: number
}

export type RemoveSparePartInStockUseCase = IUseCase<RemoveSparePartInStockInput, Result>

const removeSparePartInStockErrors = {
    DEALER_STOCK_NOT_FOUND: new ApplicationException("RemoveSparePartInStockUseCase.StockNotFound", "Dealer stock not found"),
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
        if(!sparePartResponse.success) return Result.Failure(removeSparePartInStockErrors.DEALER_STOCK_NOT_FOUND)

        const stockQuantityResponse = await _stockRepository.getStockQuantity(sparePartResponse.value, input.siret);
        if (!stockQuantityResponse.success) return Result.Failure(removeSparePartInStockErrors.DEALER_STOCK_NOT_FOUND)

        const stockQuantity = stockQuantityResponse.value;
        if (stockQuantity < input.quantity) return Result.Failure(removeSparePartInStockErrors.STOCK_RUN_OUT)

        const removeEvent = new DealerStockUpdatedEvent({
            sparePartReference: input.sparePartReference,
            siret: input.siret.getValue(),
            quantity: input.quantity * -1
        });

        const removeResponse = await _eventRepository.storeEvent(removeEvent);
        if (!removeResponse.success) return removeResponse;

        const newStockQuantity = stockQuantity - input.quantity;
        if (newStockQuantity <= 5) _notificationService.notifyLowStock(input.siret, sparePartResponse.value)

        return Result.Success("Spare part removed from stock successfully")
    }
}