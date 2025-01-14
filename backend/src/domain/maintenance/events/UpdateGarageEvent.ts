import { AbstractEvent } from "@shared/AbstractEvent";

export interface UpdateGarageEventPayload {
    siret: string,
    name: string,
    phoneNumber: string
}

export class UpdateGarageEvent extends AbstractEvent {
    static type = "GARAGE_UPDATED"
    readonly type = UpdateGarageEvent.type

    readonly streamId: string;
    readonly payload: UpdateGarageEventPayload;

    constructor(payload: UpdateGarageEventPayload) {
        super();
        this.streamId = `garage-${payload.siret}`
        this.payload = payload;
    }
}