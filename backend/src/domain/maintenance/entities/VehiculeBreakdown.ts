import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {RegisterVehiculeBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehiculeBreakDownEvent";
import {randomUUID} from "node:crypto";
import {UnregisterVehiculeBreakdownEvent} from "@domain/maintenance/events/breakdown/UnregisterVehiculeBreakdownEvent";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";
import {ApplicationException} from "@shared/ApplicationException";

export interface VehiculeBreakdownDTO {
    vehiculeBreakdownId?: string,
    vehiculeImmatriculation: string,
    description: string,
    date: Date,
    maintenanceId ?: string
}

    export class VehiculeBreakdown {
    constructor(
        public readonly vehiculeBreakdownId: string,
        public readonly vehiculeImmatriculation: VehiculeImmatriculation,
        public readonly description: string,
        public readonly date: Date,
        public readonly maintenanceId ?: string
    ) {}

    static fromObject(payload : VehiculeBreakdownDTO) {
        const vehiculeImmatriculation = VehiculeImmatriculation.create(payload.vehiculeImmatriculation);
        if(vehiculeImmatriculation instanceof Error) return vehiculeImmatriculation;
        return this.create({
            vehiculeImmatriculation,
            vehiculeBreakdownId: payload.vehiculeBreakdownId,
            description: payload.description,
            date: payload.date,
            maintenanceId: payload.maintenanceId
        })
    }

    static create(object : {
        vehiculeImmatriculation: VehiculeImmatriculation,
        vehiculeBreakdownId?: string,
        description: string,
        date: Date,
        maintenanceId ?: string
    }) {
        return new VehiculeBreakdown(object?.vehiculeBreakdownId || randomUUID(), object.vehiculeImmatriculation, object.description, object.date, object?.maintenanceId);
    }

    assignToMaintenance(maintenanceId: string) : VehiculeBreakdown | ApplicationException{
        if(!maintenanceId) return new ApplicationException("VehicleBreackdown.cannotAssignToMaintenanceWithoutMaintenanceId","Cannot assign a breakdown to a maintenance without a maintenance id");
        return new VehiculeBreakdown(
            this.vehiculeBreakdownId,
            this.vehiculeImmatriculation,
            this.description,
            this.date,
            maintenanceId
        )
    }

    assignToMaintenanceEvent() : AssignBreakdownToMaintenanceEvent | ApplicationException {
        if(!this.maintenanceId) return new ApplicationException("VehicleBreackdown.cannotAssignToMaintenanceWithoutMaintenanceId","Cannot assign a breakdown to a maintenance without a maintenance id");
        return new AssignBreakdownToMaintenanceEvent({
            vehiculeBreakDownId: this.vehiculeBreakdownId,
            maintenanceId : this.maintenanceId
        })
    }

    registerEvent(): RegisterVehiculeBreakDownEvent {
        return new RegisterVehiculeBreakDownEvent({
            vehiculeBreakdownId: this.vehiculeBreakdownId,
            vehiculeImmatriculation: this.vehiculeImmatriculation.getValue(),
            description: this.description,
            date: this.date,
            maintenanceId: this.maintenanceId
        })
    }

    unregisterEvent(): UnregisterVehiculeBreakdownEvent {
        return new UnregisterVehiculeBreakdownEvent({
            vehiculeBreakdownId: this.vehiculeBreakdownId
        })
    }
}