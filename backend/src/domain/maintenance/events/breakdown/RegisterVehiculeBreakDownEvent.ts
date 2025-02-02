import {AbstractEvent} from "@shared/AbstractEvent";
import {VehiculeBreakDownDTO} from "@domain/maintenance/entities/VehiculeBreakdown";

export class RegisterVehiculeBreakDownEvent extends AbstractEvent {
    static type = 'VEHICULE_BREAKDOWN_REGISTERED';
    readonly type = RegisterVehiculeBreakDownEvent.type;

    readonly streamId: string;
    readonly payload: VehiculeBreakDownDTO

    constructor(payload: VehiculeBreakDownDTO) {
        super();
        this.streamId = `vehicule-breakdown-${payload.vehiculeBreakDownId}`;
        this.payload = payload;
    }
}