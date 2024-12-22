import {DealerAddress} from "../value-object/DealerAddress";
import {Order} from "./Order";
import {DealerSiret} from "../value-object/DealerSiret";

export class Dealer{
    constructor(
        public readonly siret : DealerSiret,
        public readonly name : string,
        public readonly address : DealerAddress,
        public readonly phoneNumber : string,
    ) {}

}