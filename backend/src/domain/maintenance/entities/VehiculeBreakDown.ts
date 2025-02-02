import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {RegisterVehiculeBreakDownEvent} from "@domain/maintenance/events/Breakdown/RegisterVehiculeBreakDownEvent";
import {
    AsignBreakdownToMaintnenanceEvent
} from "@domain/maintenance/events/Breakdown/AsignBreakdownToMaintnenanceEvent";

export interface VehiculeBreakDownDTO {
    vehiculeBreakDownId: string,
    vehiculeImmatriculation: string,
    description: string,
    date: Date,
    maintenanceId ?: string
}

    export class VehiculeBreakDown{
    private constructor(
        private readonly vehiculeBreakDownId: string,
        private readonly vehiculeImmatriculation: VehiculeImmatriculation,
        private readonly description: string,
        private readonly date: Date,
        private readonly maintenanceId ?: string
    ) {}

    static fromObject(payload : VehiculeBreakDownDTO) {
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
        vehiculeBreakDownId: string,
        description: string,
        date: Date,
        maintenanceId ?: string
    }) {
        return new VehiculeBreakDown(object.vehiculeBreakDownId, object.vehiculeImmatriculation, object.description, object.date, object.maintenanceId);
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

    asignMaintenanceEvent(maintenanceId: string): AsignBreakdownToMaintnenanceEvent {
        return new AsignBreakdownToMaintnenanceEvent({
            vehiculeBreakDownId: this.vehiculeBreakDownId,
            maintenanceId
        })
    }

}