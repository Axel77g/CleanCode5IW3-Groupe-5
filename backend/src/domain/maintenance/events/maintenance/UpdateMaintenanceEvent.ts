import {AbstractEvent} from "@shared/AbstractEvent";
import {MaintenanceDTO} from "@domain/maintenance/entities/Maintenance";

export class UpdateMaintenanceEvent extends AbstractEvent{
    static type = 'MAINTENANCE_UPDATED';
    readonly type = UpdateMaintenanceEvent.type;
    readonly streamId: string;
    readonly payload: Pick<MaintenanceDTO, 'maintenanceId' | 'status' | "maintenanceSpareParts" | "recommendation" | "garageSiret">;

    constructor(payload: any) {
        super();
        this.streamId = `maintenance-${payload.maintenanceId}`;
        this.payload = payload;
    }
}