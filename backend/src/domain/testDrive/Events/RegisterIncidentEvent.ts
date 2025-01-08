import {AbstractEvent} from "../../../shared/AbstractEvent";

export interface RegisterIncidentEvent extends AbstractEvent{
    incidentId: string;
    driverLicenceId: string;
    description: string;
    type: string;
    createdAt: Date;
}