import {Brand} from "./Brand";
import {Immatriculation} from "../value-objects/Immatriculation";
import {Price} from "../value-objects/Price";

export class Bike{
    constructor(
        public readonly immatriculation: Immatriculation,
        public readonly brandSiret: string,
        public readonly model: string,
        public readonly year: number,
        public readonly price: Price
    ) {
    }
}