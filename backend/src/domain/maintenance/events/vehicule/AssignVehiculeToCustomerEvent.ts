import {AbstractEvent} from "@shared/AbstractEvent";

export interface AssignVehiculeToCustomerEventPayload {
    customerId: string,
    immatriculation: string
}

export class AssignVehiculeToCustomerEvent extends AbstractEvent{
    static type = 'ASSIGN_VEHICULE_TO_CUSTOMER';
    readonly type = AssignVehiculeToCustomerEvent.type;
    readonly streamId: string;
    readonly payload: AssignVehiculeToCustomerEventPayload;

    constructor(payload: AssignVehiculeToCustomerEventPayload) {
        super();
        this.streamId = `customer-${payload.customerId}`;
        this.payload = payload;
    }
}