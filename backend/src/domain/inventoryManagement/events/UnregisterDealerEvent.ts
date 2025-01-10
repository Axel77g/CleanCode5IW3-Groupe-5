import {AbstractEvent} from "../../../shared/AbstractEvent";

export interface UnregisterDealerEventPayload {
    siret: string
}

export class UnregisterDealerEvent extends AbstractEvent {
    static type = "DEALER_UNREGISTERED"
    readonly type = UnregisterDealerEvent.type

    readonly streamId :  string;
    readonly payload : UnregisterDealerEventPayload;

    constructor(payload : UnregisterDealerEventPayload){
        super();
        this.streamId = `dealer-${payload.siret}`
        this.payload = payload;
    }
}