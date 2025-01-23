import { AbstractEvent } from "@shared/AbstractEvent";

export interface UnregisterGarageEventPayload {
    siret: string
}

export class UnregisterGarageEvent extends AbstractEvent {
    static type = "GARAGE_UNREGISTERED"
    readonly type = UnregisterGarageEvent.type

    readonly streamId: string;
    readonly payload: { siret: string };

    constructor(payload: UnregisterGarageEventPayload) {
        super();
        this.streamId = `garage-${payload.siret}`
        this.payload = payload;
    }
}