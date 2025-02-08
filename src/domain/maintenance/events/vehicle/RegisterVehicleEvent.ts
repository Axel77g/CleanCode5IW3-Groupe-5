import { VehicleDTO } from '@domain/maintenance/entities/Vehicle';
import { AbstractEvent } from "@shared/AbstractEvent";

export class RegisterVehicleEvent extends AbstractEvent {
    static type = "Vehicle_REGISTERED"
    readonly type = RegisterVehicleEvent.type

    readonly streamId: string;
    readonly payload: VehicleDTO;

    constructor(payload: VehicleDTO) {
        super();
        this.streamId = `vehicle-${payload.immatriculation}`
        this.payload = payload;
    }
}