import {InventorySparePart, InventorySparePartDTO} from "../entities/InventorySparePart";

export interface OrderLineDTO {
    sparePart: InventorySparePartDTO,
    quantity: number,
    unitPrice: number,
}

export class OrderLine{
    constructor(
        public readonly sparePart : InventorySparePart,
        public readonly quantity : number,
        public readonly unitPrice : number,
    ) {}

    static create(payload : OrderLineDTO) : OrderLine | Error {
        const sparePart = InventorySparePart.fromObject(payload.sparePart);
        if(sparePart instanceof Error){
            return sparePart;
        }
        return new OrderLine(sparePart, payload.quantity, payload.unitPrice);
    }
}