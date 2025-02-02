import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {MaintenanceSparePart} from "@domain/maintenance/value-object/MaintenanceSparePart";
import {Siret} from "@domain/shared/value-object/Siret";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";

export interface MaintenanceDTO {
    maintenanceId : string,
    garageSiret : string,
    vehiculeImmatriculation: string,
    maintenanceSpartParts : MaintenanceSparePart[],
    recommendation: string,
    status: MaintenanceStatusEnum,
    date: Date,
}

export class Maintenance{
    private constructor(
        public readonly maintenanceId : string,
        public readonly vehiculeImmatriculation: VehiculeImmatriculation,
        public readonly garageSiret : Siret,
        public readonly status : MaintenanceStatusEnum,
        public readonly maintenanceSpartParts : MaintenanceSparePart[],
        public readonly recommendation: string,
        public readonly date: Date,
    ) {
    }

    get totalCost() : number {
        return this.maintenanceSpartParts.reduce((acc, part) => acc + part.price, 0);
    }

    static create(object : {
        maintenanceId : string,
        vehiculeImmatriculation: VehiculeImmatriculation,
        garageSiret : Siret,
        status : MaintenanceStatusEnum,
        maintenanceSpartParts : MaintenanceSparePart[],
        recommendation: string,
        date: Date,
    }) {
        return new Maintenance(object.maintenanceId, object.vehiculeImmatriculation, object.garageSiret, object.status, object.maintenanceSpartParts, object.recommendation, object.date);
    }

    static fromObject(payload : MaintenanceDTO) {
        const vehiculeImmatriculation = VehiculeImmatriculation.create(payload.vehiculeImmatriculation);
        if(vehiculeImmatriculation instanceof ApplicationException) return vehiculeImmatriculation;
        const garageSiret = Siret.create(payload.garageSiret);
        if(garageSiret instanceof ApplicationException) return garageSiret;
        return this.create({
            maintenanceId: payload.maintenanceId,
            garageSiret,
            vehiculeImmatriculation,
            status: payload.status,
            maintenanceSpartParts: payload.maintenanceSpartParts,
            recommendation: payload.recommendation,
            date: payload.date,
        })
    }

    registerEvent(): RegisterMaintenanceEvent {
        return new RegisterMaintenanceEvent({
            maintenanceId: this.maintenanceId,
            garageSiret: this.garageSiret.getValue(),
            vehiculeImmatriculation: this.vehiculeImmatriculation.getValue(),
            maintenanceSpartParts: this.maintenanceSpartParts,
            recommendation: this.recommendation,
            status: this.status,
            date: this.date,
        })
    }

    updateEvent() : UpdateMaintenanceEvent {
        return new UpdateMaintenanceEvent({
            status: this.status,
            maintenanceId: this.maintenanceId,
            maintenanceSpartParts: this.maintenanceSpartParts,
            recommendation: this.recommendation
        })
    }

}