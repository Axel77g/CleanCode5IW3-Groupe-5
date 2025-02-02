import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {RegisterVehiculeBreakDownEvent} from "@domain/maintenance/events/breakdown/RegisterVehiculeBreakDownEvent";
import {randomUUID} from "node:crypto";

export interface VehiculeBreakdownDTO {
    vehiculeBreakDownId?: string,
    vehiculeImmatriculation: string,
    description: string,
    date: Date,
    maintenanceId ?: string
}

    export class VehiculeBreakdown {
    constructor(
        public readonly vehiculeBreakDownId: string,
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
            vehiculeBreakDownId: payload.vehiculeBreakDownId,
            description: payload.description,
            date: payload.date,
            maintenanceId: payload.maintenanceId
        })
    }

    static create(object : {
        vehiculeImmatriculation: VehiculeImmatriculation,
        vehiculeBreakDownId?: string,
        description: string,
        date: Date,
        maintenanceId ?: string
    }) {
        return new VehiculeBreakdown(object?.vehiculeBreakDownId || randomUUID(), object.vehiculeImmatriculation, object.description, object.date, object.maintenanceId);
    }

    registerEvent(): RegisterVehiculeBreakDownEvent {
        return new RegisterVehiculeBreakDownEvent({
            vehiculeBreakDownId: this.vehiculeBreakDownId,
            vehiculeImmatriculation: this.vehiculeImmatriculation.getValue(),
            description: this.description,
            date: this.date,
            maintenanceId: this.maintenanceId
        })
    }
}