import {AbstractEvent} from "@shared/AbstractEvent";
import {VehicleBreakdownDTO} from "@domain/maintenance/entities/VehicleBreakdown";

export class RegisterVehicleBreakDownEvent extends AbstractEvent {
    static type = 'Vehicle_BREAKDOWN_REGISTERED';
    readonly type = RegisterVehicleBreakDownEvent.type;

    readonly streamId: string;
    readonly payload: VehicleBreakdownDTO

    constructor(payload: VehicleBreakdownDTO) {
        super();
        this.streamId = `vehicle-breakdown-${payload.vehicleImmatriculation}`;
        this.payload = payload;
    }
}