import { Siret } from "../../shared/value-object/Siret";
import { DealerAddress } from "../value-object/DealerAddress";

export class Dealer {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly address: DealerAddress,
        public readonly phoneNumber: string,
    ) { }

}