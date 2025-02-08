import {AbstractEvent} from "@shared/AbstractEvent";
import {VehiculeDTO} from "@domain/maintenance/entities/Vehicule";

export type UpdateVehiculeEventPayload = Pick<VehiculeDTO, "immatriculation" | "mileage" | "maintenanceInterval" | "status" | "warranty">;

export class UpdateVehiculeEvent extends AbstractEvent {
    static type = 'VEHICULE_UPDATED';
    readonly type = UpdateVehiculeEvent.type;
    readonly streamId: string;
    readonly payload: UpdateVehiculeEventPayload;

    constructor(payload: UpdateVehiculeEventPayload) {
        super();
        this.streamId = `vehicule-${payload.immatriculation}`;
        this.payload = payload;
    }
}