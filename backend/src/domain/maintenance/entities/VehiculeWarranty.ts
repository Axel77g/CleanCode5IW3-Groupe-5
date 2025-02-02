import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";


export interface VehicleWarrantyDTO {
    vehiculeImmatriculation: string,
    periodStart: Date,
    periodEnd: Date
}

export class VehiculeWarranty{
    constructor(
        public readonly vehiculeImmatriculation : VehiculeImmatriculation,
        public readonly period: Period
    ) {}

    static fromObject(payload: VehicleWarrantyDTO){
        const period= Period.create(payload.periodStart, payload.periodEnd);
        if(period instanceof ApplicationException) return period;
        const vehiculeImmatriculation = VehiculeImmatriculation.create(payload.vehiculeImmatriculation);
        if(vehiculeImmatriculation instanceof ApplicationException) return vehiculeImmatriculation;
        return this.create({
            vehiculeImmatriculation,
            period
        })
    }
    static create(payload : {
        vehiculeImmatriculation: VehiculeImmatriculation,
        period: Period
    }){
        return new VehiculeWarranty(payload.vehiculeImmatriculation, payload.period);
    }
}