import {AbstractEvent} from "@shared/AbstractEvent";


export interface AssignBreakdownToMaintenanceEventPayload {
    vehicleBreakDownId: string,
    maintenanceId: string
}

export class AssignBreakdownToMaintenanceEvent extends AbstractEvent{
    static type = 'ASSIGN_BREAKDOWN_TO_MAINTENANCE';
    readonly type = AssignBreakdownToMaintenanceEvent.type;
    readonly streamId: string;
    readonly payload: AssignBreakdownToMaintenanceEventPayload;

    constructor(payload: AssignBreakdownToMaintenanceEventPayload) {
        super();
        this.streamId = `vehicle-breakdown-${payload.vehicleBreakDownId}`;
        this.payload = payload;
    }
}