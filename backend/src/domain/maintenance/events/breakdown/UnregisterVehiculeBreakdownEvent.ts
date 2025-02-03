import {AbstractEvent} from "@shared/AbstractEvent";

export interface UnregisterVehiculeBreakdownEventPayload {
    vehiculeBreakdownId: string,
}

export class UnregisterVehiculeBreakdownEvent extends AbstractEvent {
    static type = 'VEHICULE_BREAKDOWN_UNREGISTERED';
    readonly type = UnregisterVehiculeBreakdownEvent.type;

    readonly streamId: string;
    readonly payload: UnregisterVehiculeBreakdownEventPayload;

    constructor(payload: UnregisterVehiculeBreakdownEventPayload) {
        super();
        this.streamId = `vehicule-breakdown-${payload.vehiculeBreakdownId}`;
        this.payload = payload;
    }
}