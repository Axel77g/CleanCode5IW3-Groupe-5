import {AbstractEvent} from "@shared/AbstractEvent";

export interface UnregisterVehicleBreakdownEventPayload {
    vehicleBreakdownId: string,
}

export class UnregisterVehicleBreakdownEvent extends AbstractEvent {
    static type = 'Vehicle_BREAKDOWN_UNREGISTERED';
    readonly type = UnregisterVehicleBreakdownEvent.type;

    readonly streamId: string;
    readonly payload: UnregisterVehicleBreakdownEventPayload;

    constructor(payload: UnregisterVehicleBreakdownEventPayload) {
        super();
        this.streamId = `vehicle-breakdown-${payload.vehicleBreakdownId}`;
        this.payload = payload;
    }
}