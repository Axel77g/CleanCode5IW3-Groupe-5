import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {ApplicationException} from "@shared/ApplicationException";

export interface OrderLineDTO {
    reference: string,
    quantity: number,
    unitPrice: number,
}

export class OrderLine{
    static errors = {
        INVALID_QUANTITY : new ApplicationException("OrderLine.QuantityMustBeGreaterThanZero","Quantity must be greater than 0")
    }

    constructor(
        public readonly reference : string,
        public readonly quantity : number,
        public readonly unitPrice : number,
    ) {}

    static create(payload : OrderLineDTO) : OrderLine | ApplicationException {
        const inventorySparePart = InventorySparePart.create({reference: payload.reference, name: "FAKE NAME"});
        if(inventorySparePart instanceof ApplicationException) return inventorySparePart;
        if(payload.quantity <= 0) return  OrderLine.errors.INVALID_QUANTITY;

        return new OrderLine(payload.reference, payload.quantity, payload.unitPrice);
    }

    get price() : number {
        return this.quantity * this.unitPrice;
    }
}