import { AbstractEvent } from "@shared/AbstractEvent";
import { GarageDTO } from "../../entities/Garage";

export class RegisterGarageEvent extends AbstractEvent {
    static type = 'GARAGE_REGISTERED';
    readonly type = RegisterGarageEvent.type;

    readonly streamId: string;
    readonly payload: GarageDTO;

    constructor(payload: GarageDTO) {
        super();
        this.streamId = `garage-${payload.siret}`;
        this.payload = payload;
    }
}