import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {MaintenanceSparePart} from "@domain/maintenance/value-object/MaintenanceSparePart";
import {Siret} from "@domain/shared/value-object/Siret";
import {RegisterMaintenanceEvent} from "@domain/maintenance/events/maintenance/RegisterMaintenanceEvent";
import {UpdateMaintenanceEvent} from "@domain/maintenance/events/maintenance/UpdateMaintenanceEvent";
import {ApplicationException} from "@shared/ApplicationException";
import {MaintenanceStatusEnum} from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {randomUUID} from "node:crypto";
import {Price} from "@domain/shared/value-object/Price";

export interface MaintenanceDTO {
    maintenanceId : string,
    garageSiret : string | null,
    vehicleImmatriculation: string,
    maintenanceSpareParts : MaintenanceSparePart[],
    recommendation: string,
    status: MaintenanceStatusEnum,
    date: Date,
}

export class Maintenance{
    private constructor(
        public readonly maintenanceId : string,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly garageSiret : Siret | null,
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
        vehicleImmatriculation: VehicleImmatriculation,
        garageSiret : Siret | null,
        status : MaintenanceStatusEnum,
        maintenanceSpareParts : MaintenanceSparePart[],
        recommendation: string,
        date: Date,
    }) : Maintenance | ApplicationException {
        return new Maintenance(object.maintenanceId || randomUUID(), object.vehicleImmatriculation, object.garageSiret, object.status, object.maintenanceSpareParts, object.recommendation, object.date);
    }

    static fromObject(payload : MaintenanceDTO) {
        const vehicleImmatriculation = VehicleImmatriculation.create(payload.vehicleImmatriculation);
        if(vehicleImmatriculation instanceof ApplicationException) return vehicleImmatriculation;
        const garageSiret = payload.garageSiret ? Siret.create(payload.garageSiret) : null;
        if(garageSiret instanceof ApplicationException) return garageSiret;
        return this.create({
            maintenanceId: payload.maintenanceId,
            garageSiret,
            vehicleImmatriculation,
            status: payload.status,
            maintenanceSpareParts: payload.maintenanceSpareParts,
            recommendation: payload.recommendation,
            date: payload.date,
        })
    }

    get totalPrice() : Price {
        const value = this.maintenanceSpareParts.reduce((acc, part) => acc + part.price, 0);
        return Price.create(Math.max(value,0)) as Price;
    }

    update( object : {
        garageSiret ?: Siret | null,
        status ?: MaintenanceStatusEnum,
        recommendation ?: string,
        maintenanceSpareParts ?: MaintenanceSparePart[],
    }) {
        const garageSiret = object.garageSiret === null ? null : object.garageSiret || this.garageSiret;
        return new Maintenance(
            this.maintenanceId,
            this.vehicleImmatriculation,
            garageSiret,
            object.status || this.status,
            object.maintenanceSpareParts || this.maintenanceSpareParts,
            object.recommendation || this.recommendation,
            this.date
        );
    }

    registerEvent(): RegisterMaintenanceEvent {
        return new RegisterMaintenanceEvent({
            maintenanceId: this.maintenanceId,
            garageSiret: this.garageSiret?.getValue() || null,
            vehicleImmatriculation: this.vehicleImmatriculation.getValue(),
            maintenanceSpareParts: this.maintenanceSpareParts,
            recommendation: this.recommendation,
            status: this.status,
            date: this.date,
        })
    }

    updateEvent() : UpdateMaintenanceEvent {
        return new UpdateMaintenanceEvent({
            status: this.status,
            garageSiret: this.garageSiret?.getValue() || null,
            maintenanceId: this.maintenanceId,
            maintenanceSpareParts: this.maintenanceSpareParts,
            recommendation: this.recommendation
        })
    }
}