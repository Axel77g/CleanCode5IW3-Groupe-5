import { VehiculeDTO } from "@domain/maintenance/entities/Vehicule";
import { AbstractEvent } from "@shared/AbstractEvent";

export class UnregisterVehiculeEvent extends AbstractEvent {
    static type = 'VEHICULE_UNREGISTERED';
    readonly type = UnregisterVehiculeEvent.type;

    readonly streamId: string;
    readonly payload: VehiculeDTO;

    constructor(payload: VehiculeDTO) {
        super();
        this.streamId = `vehicule-${payload.immatriculation}`;
        this.payload = payload;
    }
}