import { VehicleStatusEnum } from "@domain/maintenance/enums/VehicleStatusEnum";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { AbstractEvent } from "@shared/AbstractEvent";

export interface UpdateVehicleStatusEventPayload {
    immatriculation: VehicleImmatriculation,
    status: VehicleStatusEnum
}

export class UpdateVehicleStatusEvent extends AbstractEvent {
    static type = 'Vehicle_STATUS_UPDATED';
    readonly type = UpdateVehicleStatusEvent.type;

    readonly streamId: string;
    readonly payload: UpdateVehicleStatusEventPayload;

    constructor(payload: UpdateVehicleStatusEventPayload) {
        super();
        this.streamId = `vehicle-${payload.immatriculation}`;
        this.payload = payload;
    }
}