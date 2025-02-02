import {AbstractEvent} from "@shared/AbstractEvent";


export interface AsignBreakdownToMaintnenanceEventPayload {
    vehiculeBreakDownId: string,
    maintenanceId: string
}

export class AssignBreakdownToMaintenanceEvent extends AbstractEvent{
    static type = 'ASIGN_BREAKDOWN_TO_MAINTENANCE';
    readonly type = AssignBreakdownToMaintenanceEvent.type;
    readonly streamId: string;
    readonly payload: AsignBreakdownToMaintnenanceEventPayload;

    constructor(payload: AsignBreakdownToMaintnenanceEventPayload) {
        super();
        this.streamId = `vehicule-breakdown-${payload.vehiculeBreakDownId}`;
        this.payload = payload;
    }
}