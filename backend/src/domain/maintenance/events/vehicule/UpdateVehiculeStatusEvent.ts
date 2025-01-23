import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { AbstractEvent } from "@shared/AbstractEvent";

export interface UpdateVehiculeStatusEventPayload {
    immatriculation: VehiculeImmatriculation,
    status: VehiculeStatusEnum
}

export class UpdateVehiculeStatusEvent extends AbstractEvent {
    static type = 'VEHICULE_STATUS_UPDATED';
    readonly type = UpdateVehiculeStatusEvent.type;

    readonly streamId: string;
    readonly payload: UpdateVehiculeStatusEventPayload;

    constructor(payload: UpdateVehiculeStatusEventPayload) {
        super();
        this.streamId = `vehicule-${payload.immatriculation}`;
        this.payload = payload;
    }
}