import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {RegisterVehicleBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehicleBreakDownEvent";
import {randomUUID} from "node:crypto";
import {UnregisterVehicleBreakdownEvent} from "@domain/maintenance/events/breakdown/UnregisterVehicleBreakdownEvent";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";
import {ApplicationException} from "@shared/ApplicationException";

export interface VehicleBreakdownDTO {
    vehicleBreakdownId?: string,
    vehicleImmatriculation: string,
    description: string,
    date: Date,
    maintenanceId ?: string
}

    export class VehicleBreakdown {
    constructor(
        public readonly vehicleBreakdownId: string,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly description: string,
        public readonly date: Date,
        public readonly maintenanceId ?: string
    ) {}

    static fromObject(payload : VehicleBreakdownDTO) {
        const vehicleImmatriculation = VehicleImmatriculation.create(payload.vehicleImmatriculation);
        if(vehicleImmatriculation instanceof Error) return vehicleImmatriculation;
        return this.create({
            vehicleImmatriculation,
            vehicleBreakdownId: payload.vehicleBreakdownId,
            description: payload.description,
            date: payload.date,
            maintenanceId: payload.maintenanceId
        })
    }

    static create(object : {
        vehicleImmatriculation: VehicleImmatriculation,
        vehicleBreakdownId?: string,
        description: string,
        date: Date,
        maintenanceId ?: string
    }) {
        return new VehicleBreakdown(object?.vehicleBreakdownId || randomUUID(), object.vehicleImmatriculation, object.description, object.date, object?.maintenanceId);
    }

    assignToMaintenance(maintenanceId: string) : VehicleBreakdown | ApplicationException{
        if(!maintenanceId) return new ApplicationException("VehicleBreackdown.cannotAssignToMaintenanceWithoutMaintenanceId","Cannot assign a breakdown to a maintenance without a maintenance id");
        return new VehicleBreakdown(
            this.vehicleBreakdownId,
            this.vehicleImmatriculation,
            this.description,
            this.date,
            maintenanceId
        )
    }

    assignToMaintenanceEvent() : AssignBreakdownToMaintenanceEvent | ApplicationException {
        if(!this.maintenanceId) return new ApplicationException("VehicleBreackdown.cannotAssignToMaintenanceWithoutMaintenanceId","Cannot assign a breakdown to a maintenance without a maintenance id");
        return new AssignBreakdownToMaintenanceEvent({
            vehicleBreakDownId: this.vehicleBreakdownId,
            maintenanceId : this.maintenanceId
        })
    }

    registerEvent(): RegisterVehicleBreakDownEvent {
        return new RegisterVehicleBreakDownEvent({
            vehicleBreakdownId: this.vehicleBreakdownId,
            vehicleImmatriculation: this.vehicleImmatriculation.getValue(),
            description: this.description,
            date: this.date,
            maintenanceId: this.maintenanceId
        })
    }

    unregisterEvent(): UnregisterVehicleBreakdownEvent {
        return new UnregisterVehicleBreakdownEvent({
            vehicleBreakdownId: this.vehicleBreakdownId
        })
    }
}