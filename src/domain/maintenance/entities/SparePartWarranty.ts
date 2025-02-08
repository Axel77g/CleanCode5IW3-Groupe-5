import {Period} from "@domain/testDrive/value-object/Period";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";

export interface SparePartWarrantyDTO {
    sparePartReference: string,
    vehicleImmatriculation: string,
    periodStart: Date,
    periodEnd: Date
}

export class SparePartWarranty {
    constructor(
        public readonly sparePartReference: string,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly period : Period
    ) {}

    static fromObject(payload : SparePartWarrantyDTO){
        const period = Period.create(payload.periodStart, payload.periodEnd);
        if(period instanceof ApplicationException) return period;
        const vehicleImmatriculation = VehicleImmatriculation.create(payload.vehicleImmatriculation);
        if(vehicleImmatriculation instanceof ApplicationException) return vehicleImmatriculation;
        return this.create({
            vehicleImmatriculation,
            period,
            sparePartReference: payload.sparePartReference
        })
    }

    static create(object : {
        vehicleImmatriculation: VehicleImmatriculation,
        period: Period
        sparePartReference: string
    }){
        return new SparePartWarranty(object.sparePartReference, object.vehicleImmatriculation, object.period);
    }
}