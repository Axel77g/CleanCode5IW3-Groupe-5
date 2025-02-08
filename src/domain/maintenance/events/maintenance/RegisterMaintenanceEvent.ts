import {AbstractEvent} from "@shared/AbstractEvent";
import {MaintenanceDTO} from "@domain/maintenance/entities/Maintenance";

export class RegisterMaintenanceEvent extends AbstractEvent {
    static type = 'MAINTENANCE_REGISTERED';
    readonly type = RegisterMaintenanceEvent.type;
    readonly streamId: string;
    readonly payload: MaintenanceDTO;

    constructor(payload: MaintenanceDTO) {
        super();
        this.streamId = `maintenance-${payload.maintenanceId}`;
        this.payload = payload;
    }
}