import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {MaintenanceSparePart} from "@domain/maintenance/value-object/MaintenanceSparePart";
import {Siret} from "@domain/shared/value-object/Siret";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {randomUUID} from "node:crypto";

export interface MaintenanceDTO {
    maintenanceId : string,
    garageSiret : string,
    vehiculeImmatriculation: string,
    maintenanceSpareParts : MaintenanceSparePart[],
    recommendation: string,
    status: MaintenanceStatusEnum,
    date: Date,
}

export class Maintenance{
    constructor(
        public readonly maintenanceId : string,
        public readonly vehiculeImmatriculation: VehiculeImmatriculation,
        public readonly garageSiret : Siret,
        public readonly status : MaintenanceStatusEnum,
        public readonly maintenanceSpareParts : MaintenanceSparePart[],
        public readonly recommendation: string,
        public readonly date: Date,
    ) {
    }

    getTotalCost() : number {
        return this.maintenanceSpareParts.reduce((acc, part) => acc + part.price, 0);
    }

    static create(object : {
        maintenanceId ?: string,
        vehiculeImmatriculation: VehiculeImmatriculation,
        garageSiret : Siret,
        status : MaintenanceStatusEnum,
        maintenanceSpareParts : MaintenanceSparePart[],
        recommendation: string,
        date: Date,
    }) : Maintenance | ApplicationException {
        return new Maintenance(object.maintenanceId || randomUUID(), object.vehiculeImmatriculation, object.garageSiret, object.status, object.maintenanceSpareParts, object.recommendation, object.date);
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
            maintenanceSpareParts: payload.maintenanceSpareParts,
            recommendation: payload.recommendation,
            date: payload.date,
        })
    }

    update( object : {
        status : MaintenanceStatusEnum,
        recommendation: string,
        maintenanceSpareParts: MaintenanceSparePart[],
    }) {
        return new Maintenance(
            this.maintenanceId,
            this.vehiculeImmatriculation,
            this.garageSiret,
            object.status,
            this.maintenanceSpareParts,
            this.recommendation,
            this.date
        );
    }

    registerEvent(): RegisterMaintenanceEvent {
        return new RegisterMaintenanceEvent({
            maintenanceId: this.maintenanceId,
            garageSiret: this.garageSiret.getValue(),
            vehiculeImmatriculation: this.vehiculeImmatriculation.getValue(),
            maintenanceSpareParts: this.maintenanceSpareParts,
            recommendation: this.recommendation,
            status: this.status,
            date: this.date,
        })
    }

    updateEvent() : UpdateMaintenanceEvent {
        return new UpdateMaintenanceEvent({
            status: this.status,
            maintenanceId: this.maintenanceId,
            maintenanceSpareParts: this.maintenanceSpareParts,
            recommendation: this.recommendation
        })
    }
}