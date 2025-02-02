import {ApplicationException} from "@shared/ApplicationException";

export class MaintenanceSparePart{
    static errors= {
        NULL_UNIT_PRICE: new ApplicationException("MaintenanceSparePart.nullUnitPrice","The unit price must be greater than 0"),
        NULL_QUANTITY: new ApplicationException("MaintenanceSparePart.nullQuantity","The quantity must be greater than 0"),
    }
    private constructor(
        public readonly unitPrice: number,
        public readonly quantity: number,
        public readonly sparePartReference: string,
    ) {}

    static create(object : {
        unitPrice: number,
        quantity: number,
        sparePartReference: string
    }){
        if(object.unitPrice <= 0) return MaintenanceSparePart.errors.NULL_UNIT_PRICE;
        if(object.quantity <= 0) return MaintenanceSparePart.errors.NULL_QUANTITY;
        return new MaintenanceSparePart(object.unitPrice, object.quantity, object.sparePartReference);
    }

    get price() : number {
        return this.unitPrice * this.quantity;
    }
}