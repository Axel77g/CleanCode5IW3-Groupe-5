import { Siret } from "../../shared/value-object/Siret";
import { DealerAddress   } from "../value-object/DealerAddress";

export class Garage {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly phoneNumber: string,
        // public readonly address: DealerAddress,
    ) { }
}