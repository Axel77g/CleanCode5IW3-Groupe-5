import {AbstractEvent} from "../../../shared/AbstractEvent";
import {DealerDTO} from "../entities/Dealer";

export class RegisterDealerEvent extends AbstractEvent{
    static type = "DEALER_REGISTERED"
    readonly type = RegisterDealerEvent.type

    readonly streamId :  string;
    readonly payload : DealerDTO;

    constructor(payload : DealerDTO){
        super();
        this.streamId = `dealer-${payload.siret}`
        this.payload = payload;
    }
}