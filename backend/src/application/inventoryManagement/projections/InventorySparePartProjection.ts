import {IProjection} from "../../../shared/IProjection";
import {IEvent} from "../../../shared/AbstractEvent";
import {UpsertInventorySparePartEvent} from "../../../domain/inventoryManagement/events/UpsertInventorySparePartEvent";
import {InventorySparePartRepository} from "../repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../domain/inventoryManagement/entities/InventorySparePart";

export class InventorySparePartProjection implements IProjection{
    constructor(private _inventorySparePartRepository: InventorySparePartRepository) {}
    async receive(event: IEvent): Promise<void> {
        switch (event.constructor) {
            case UpsertInventorySparePartEvent:
                await this.applyUpsertInventorySparePartEvent(event as UpsertInventorySparePartEvent)
                break;
        }
    }

    async applyUpsertInventorySparePartEvent(event: UpsertInventorySparePartEvent) {
        await this._inventorySparePartRepository.store(InventorySparePart.fromObject(event.payload))
    }
}