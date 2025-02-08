import { VehicleDTO } from "@domain/maintenance/entities/Vehicle";
import { AbstractEvent } from "@shared/AbstractEvent";

export class UnregisterVehicleEvent extends AbstractEvent {
    static type = 'Vehicle_UNREGISTERED';
    readonly type = UnregisterVehicleEvent.type;

    readonly streamId: string;
    readonly payload: Pick<VehicleDTO,'immatriculation'>;

    constructor(payload: Pick<VehicleDTO,'immatriculation'>) {
        super();
        this.streamId = `vehicle-${payload.immatriculation}`;
        this.payload = payload;
    }
}