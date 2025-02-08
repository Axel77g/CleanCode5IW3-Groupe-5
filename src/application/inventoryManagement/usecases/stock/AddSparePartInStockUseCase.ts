import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {
    GetInventorySparePartUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/GetInventorySparePartUseCase";
import {StockInventorySparePart} from "@domain/inventoryManagement/value-object/StockInventorySparePart";
import {ApplicationException} from "@shared/ApplicationException";

interface AddSparePartInStockInput extends IInputUseCase {
    siret: Siret,
    sparePartReference: string,
    quantity: number
}

export type AddSparePartInStockUseCase = IUseCase<AddSparePartInStockInput, Result>
export const createAddSparePartInStockUseCase = (_eventRepository: EventRepository, _getInventorySparePartUseCase: GetInventorySparePartUseCase): AddSparePartInStockUseCase => {
    return async (input: AddSparePartInStockInput) => {
        const sparePartResponse = await _getInventorySparePartUseCase({ reference: input.sparePartReference });
        if (!sparePartResponse.success) return sparePartResponse
        const stock = StockInventorySparePart.create({
            siret: input.siret,
            sparePartReference: sparePartResponse.value.reference,
            quantity: 0
        })
        if(stock instanceof ApplicationException) return Result.Failure(stock)
        const {event : addEvent} = stock.add(input.quantity);
        const addResponse = await _eventRepository.storeEvent(addEvent);
        if (!addResponse.success) return Result.FailureStr("Cannot add spare part in stock, an error occurred while adding");
        return Result.Success("Spare part added in stock successfully")
    }
}