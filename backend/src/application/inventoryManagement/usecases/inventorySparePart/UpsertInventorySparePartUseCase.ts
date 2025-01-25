import { IInputUseCase, IUseCase} from "@shared/IUseCase";
import {
    InventorySparePart,
    InventorySparePartDTO
} from "@domain/inventoryManagement/entities/InventorySparePart";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {ApplicationException} from "@shared/ApplicationException";

interface UpsertInventorySparePartInput extends IInputUseCase, InventorySparePartDTO{}

export type UpsertInventorySparePartUseCase = IUseCase<UpsertInventorySparePartInput, Result>
export const createUpsertInventorySparePartUseCase = (
    _eventRepository: EventRepository,
): UpsertInventorySparePartUseCase => {

    return async (input: UpsertInventorySparePartInput) => {
        const inventorySparePart = InventorySparePart.create(input)
        if(inventorySparePart instanceof ApplicationException) return Result.Failure(inventorySparePart)
        const storeResponse = await _eventRepository.storeEvent(inventorySparePart.upsertEvent())
        if (!storeResponse.success) return storeResponse
        return Result.Success("Spare part upserted successfully")
    }
}