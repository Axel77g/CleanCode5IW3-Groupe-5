import { IInputUseCase, IUseCase} from "@shared/IUseCase";
import {
        InventorySparePartDTO
} from "@domain/inventoryManagement/entities/InventorySparePart";
import {Result} from "@shared/Result";
import {
    UpsertInventorySparePartEvent
} from "@domain/inventoryManagement/events/UpsertInventorySparePartEvent";
import {EventRepository} from "../../../shared/repositories/EventRepository";

interface UpsertInventorySparePartInput extends IInputUseCase, InventorySparePartDTO{}

export type UpsertInventorySparePartUseCase = IUseCase<UpsertInventorySparePartInput, Result>
export const upsertInventorySparePartUseCase = (
    _eventRepository: EventRepository,
): UpsertInventorySparePartUseCase => {

    return async (input: UpsertInventorySparePartInput) => {
        const upsertSparePartEvent = new UpsertInventorySparePartEvent(input)
        const storeResponse = await _eventRepository.storeEvent(upsertSparePartEvent)
        if (!storeResponse.success) return storeResponse
        return Result.Success("Spare part upserted successfully")
    }
}