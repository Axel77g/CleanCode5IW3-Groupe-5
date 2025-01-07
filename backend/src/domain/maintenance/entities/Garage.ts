import { Siret } from "../../shared/value-object/Siret";
import { GarageAddress } from "../value-object/GarageAddress";

export class Garage {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly address: GarageAddress,
    ) { }
}