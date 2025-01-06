import {InventorySparePart} from "../entities/InventorySparePart";

export class StockInventorySparePart {
    constructor(
        public readonly sparePart: InventorySparePart,
        public quantity: number,
    ) {}


    add(quantity: number): void {
        this.quantity += quantity;
    }
}