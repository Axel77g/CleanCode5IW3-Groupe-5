import {AbstractEvent} from "@shared/AbstractEvent";

export interface AssignVehicleToCustomerEventPayload {
    customerId: string,
    immatriculation: string
}

export class AssignVehicleToCustomerEvent extends AbstractEvent{
    static type = 'ASSIGN_Vehicle_TO_CUSTOMER';
    readonly type = AssignVehicleToCustomerEvent.type;
    readonly streamId: string;
    readonly payload: AssignVehicleToCustomerEventPayload;

    constructor(payload: AssignVehicleToCustomerEventPayload) {
        super();
        this.streamId = `customer-${payload.customerId}`;
        this.payload = payload;
    }
}