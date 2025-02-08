import {AbstractEvent} from "@shared/AbstractEvent";

export interface DealerStockUpdatedEventPayload {
    sparePartReference: string,
    siret : string,
    quantity: number,
}

export class DealerStockUpdatedEvent extends AbstractEvent{
    static type = "DEALER_STOCK_UPDATED"
    readonly type = DealerStockUpdatedEvent.type

    readonly streamId :  string;
    readonly payload : DealerStockUpdatedEventPayload

    constructor(payload : DealerStockUpdatedEventPayload){
        super();
        this.streamId = `stock-${payload.siret}-${payload.sparePartReference}`
        this.payload = payload;
    }
}