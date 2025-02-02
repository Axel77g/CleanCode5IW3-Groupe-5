import {AbstractEvent} from "@shared/AbstractEvent";
import {
    UpdateVehiculeStatusEvent,
} from "@domain/maintenance/events/vehicule/UpdateVehiculeStatusEvent";
import {VehiculeDTO} from "@domain/maintenance/entities/Vehicule";

export type UpdateVehiculeEventPayload = Pick<VehiculeDTO, "immatriculation" | "mileage" | "maintenanceInterval">

export class UpdateVehiculeEvent extends AbstractEvent {
    static type = 'VEHICULE_UPDATED';
    readonly type = UpdateVehiculeStatusEvent.type;
    readonly streamId: string;
    readonly payload: UpdateVehiculeEventPayload;

    constructor(payload: UpdateVehiculeEventPayload) {
        super();
        this.streamId = `vehicule-${payload.immatriculation}`;
        this.payload = payload;
    }
}