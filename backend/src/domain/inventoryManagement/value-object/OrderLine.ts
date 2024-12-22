import {InventorySparePart} from "../entities/InventorySparePart";


export class OrderLine{
    constructor(
        public readonly sparePart : InventorySparePart,
        public readonly quantity : number,
        public readonly unitPrice : number,
    ) {}
}