import { AbstractEvent } from "@shared/AbstractEvent";
import { InventorySparePartDTO } from "../entities/InventorySparePart";

export class UpsertInventorySparePartEvent extends AbstractEvent {
    static type = "INVENTORY_SPARE_PART_UPSERTED"
    readonly type = UpsertInventorySparePartEvent.type

    readonly streamId: string;
    readonly payload: InventorySparePartDTO;

    constructor(payload: InventorySparePartDTO) {
        super();
        this.streamId = `inventory-spare-part-${payload.reference}`
        this.payload = payload;
    }
}