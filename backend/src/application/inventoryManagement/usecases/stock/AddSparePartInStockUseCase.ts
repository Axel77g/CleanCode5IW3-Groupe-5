import { InventorySparePart } from "@domain/inventoryManagement/entities/InventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { StockRepository } from "../../repositories/StockRepository";
import { GetInventorySparePartUseCase } from "../inventorySparePart/GetInventorySparePartUseCase";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {EventRepository} from "../../../shared/repositories/EventRepository";

interface AddSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePartReference: string,
    quantity: number
}

export type AddSparePartInStockUseCase = IUseCase<AddSparePartInStockInput, Result>
export const createAddSparePartInStockUseCase = (_eventRepository: EventRepository, _getInventorySparePartUseCase: GetInventorySparePartUseCase): AddSparePartInStockUseCase => {
    return async (input: AddSparePartInStockInput) => {
        const sparePartResponse = await _getInventorySparePartUseCase({ reference: input.sparePartReference });
        if (!sparePartResponse.success) return Result.FailureStr("Spare part not found");
        const addEvent = new DealerStockUpdatedEvent({
            sparePartReference: input.sparePartReference,
            siret: input.siret.getValue(),
            quantity: input.quantity
        })
        const addResponse = await _eventRepository.storeEvent(addEvent);
        if (!addResponse.success) return Result.FailureStr("Cannot add spare part in stock, an error occurred while adding");
        return Result.Success("Spare part added in stock successfully")
    }
}