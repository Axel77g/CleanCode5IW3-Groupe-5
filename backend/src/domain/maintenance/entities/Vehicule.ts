import { VehiculeModel } from "../enums/VehiculeModel";
import { VehiculeImmatriculation } from "../value-objects/VehiculeImmatriculation";

export class Vehicule {
    constructor(
        public readonly immatriculation: VehiculeImmatriculation,
        public readonly model: VehiculeModel,
        public readonly a2_compatible: boolean,
        public readonly year: number,
        public readonly mileage: number,
        public readonly vin: string,
        public readonly registrationNumber: string,
        public readonly maintenance: Maintenance[],
    ) { }
}