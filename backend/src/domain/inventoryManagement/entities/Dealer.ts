import { DealerAddress } from "../../maintenance/value-object/DealerAddress";
import { Siret } from "../../shared/value-object/Siret";

export class Dealer {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly address: DealerAddress,
        public readonly phoneNumber: string,
    ) { }

}