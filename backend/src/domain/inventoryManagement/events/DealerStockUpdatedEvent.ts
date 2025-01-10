import {AbstractEvent} from "../../../shared/AbstractEvent";

export interface DealerStockUpdatedEventPayload {
    sparePartReference: string,
    siret : string,
    quantity: number,
}

export class DealerStockUpdatedEvent extends AbstractEvent{
    static type = "SPARE_PART_ADDED"
    readonly type = DealerStockUpdatedEvent.type

    readonly streamId :  string;
    readonly payload : DealerStockUpdatedEventPayload

    constructor(payload : DealerStockUpdatedEventPayload){
        super();
        this.streamId = `stock-${payload.siret}-${payload.sparePartReference}`
        this.payload = payload;
    }
}