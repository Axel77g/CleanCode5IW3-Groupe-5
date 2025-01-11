import {AbstractEvent} from "@shared/AbstractEvent";
import {IncidentDTO} from "../entities/Incident";

export class RegisterIncidentEvent extends AbstractEvent{
    static type = "REGISTER_INCIDENT"
    readonly type = RegisterIncidentEvent.type;

    readonly streamId: string;
    readonly payload: IncidentDTO;
    constructor(payload: IncidentDTO) {
        super();
        this.streamId = `incident-${payload.incidentId}`;
        this.payload = payload;
    }
}