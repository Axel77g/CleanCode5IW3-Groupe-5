import {AbstractEvent} from "@shared/AbstractEvent";
import {VehicleDTO} from "@domain/maintenance/entities/Vehicle";

export type UpdateVehicleEventPayload = Pick<VehicleDTO, "immatriculation" | "mileage" | "maintenanceInterval" | "status" | "warranty">;

export class UpdateVehicleEvent extends AbstractEvent {
    static type = 'Vehicle_UPDATED';
    readonly type = UpdateVehicleEvent.type;
    readonly streamId: string;
    readonly payload: UpdateVehicleEventPayload;

    constructor(payload: UpdateVehicleEventPayload) {
        super();
        this.streamId = `vehicle-${payload.immatriculation}`;
        this.payload = payload;
    }
}