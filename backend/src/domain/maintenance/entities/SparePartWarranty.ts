import {Period} from "@domain/testDrive/value-object/Period";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";

export interface SparePartWarrantyDTO {
    sparePartReference: string,
    vehiculeImmatriculation: string,
    periodStart: Date,
    periodEnd: Date
}

export class SparePartWarranty {
    constructor(
        public readonly sparePartReference: string,
        public readonly vehiculeImmatriculation: VehiculeImmatriculation,
        public readonly period : Period
    ) {}

    static fromObject(payload : SparePartWarrantyDTO){
        const period = Period.create(payload.periodStart, payload.periodEnd);
        if(period instanceof ApplicationException) return period;
        const vehiculeImmatriculation = VehiculeImmatriculation.create(payload.vehiculeImmatriculation);
        if(vehiculeImmatriculation instanceof ApplicationException) return vehiculeImmatriculation;
        return this.create({
            vehiculeImmatriculation,
            period,
            sparePartReference: payload.sparePartReference
        })
    }

    static create(object : {
        vehiculeImmatriculation: VehiculeImmatriculation,
        period: Period
        sparePartReference: string
    }){
        return new SparePartWarranty(object.sparePartReference, object.vehiculeImmatriculation, object.period);
    }
}