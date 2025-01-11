import { InventorySparePart } from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { StockRepository } from "../../repositories/StockRepository";
import { NotificationServices } from "../../services/NotificationServices";
import {EventRepository} from "../../../shared/repositories/EventRepository";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {ApplicationException} from "@shared/ApplicationException";

interface RemoveSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePart: InventorySparePart,
    quantity: number
}

export type RemoveSparePartInStockUseCase = IUseCase<RemoveSparePartInStockInput, Result>

const removeSparePartInStockErrors = {
    DEALER_STOCK_NOT_FOUND: new ApplicationException("RemoveSparePartInStockUseCase.StockNotFound", "Dealer stock not found"),
    STOCK_RUN_OUT: new ApplicationException("RemoveSparePartInStockUseCase.StockRunOut", "Stock run out"),
}
export const removeSparePartInStockUseCase = (_eventRepository : EventRepository, _stockRepository: StockRepository, _notificationService: NotificationServices): RemoveSparePartInStockUseCase => {
    return async (input: RemoveSparePartInStockInput) => {
        const stockQuantityResponse = await _stockRepository.getStockQuantity(input.sparePart, input.siret);
        if (!stockQuantityResponse.success) return Result.Failure(removeSparePartInStockErrors.DEALER_STOCK_NOT_FOUND)

        const stockQuantity = stockQuantityResponse.value;
        if (stockQuantity < input.quantity) return Result.Failure(removeSparePartInStockErrors.STOCK_RUN_OUT)

        const removeEvent = new DealerStockUpdatedEvent({
            sparePartReference: input.sparePart.reference,
            siret: input.siret.getValue(),
            quantity: input.quantity * -1
        });

        const removeResponse = await _eventRepository.storeEvent(removeEvent);
        if (!removeResponse.success) return removeResponse;

        const newStockQuantity = stockQuantity - input.quantity;
        if (newStockQuantity === 5) _notificationService.notifyLowStock(input.siret, input.sparePart)

        return Result.Success("Spare part removed from stock successfully")
    }
}