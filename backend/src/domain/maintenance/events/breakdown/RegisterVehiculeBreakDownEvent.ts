import {AbstractEvent} from "@shared/AbstractEvent";
import {VehiculeBreakdownDTO} from "@domain/maintenance/entities/VehiculeBreakdown";

export class RegisterVehiculeBreakDownEvent extends AbstractEvent {
    static type = 'VEHICULE_BREAKDOWN_REGISTERED';
    readonly type = RegisterVehiculeBreakDownEvent.type;

    readonly streamId: string;
    readonly payload: VehiculeBreakdownDTO

    constructor(payload: VehiculeBreakdownDTO) {
        super();
        this.streamId = `vehicule-breakdown-${payload.vehiculeImmatriculation}`;
        this.payload = payload;
    }
}