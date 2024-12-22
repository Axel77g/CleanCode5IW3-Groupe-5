import {InventorySparePart} from "../entities/InventorySparePart";
import {DealerSiret} from "./DealerSiret";

export class StockInventorySparePart {
    constructor(
        public readonly sparePart: InventorySparePart,
        public quantity: number,
    ) {}


    add(quantity: number): void {
        this.quantity += quantity;
    }
}