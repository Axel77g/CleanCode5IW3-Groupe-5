export interface OrderLineDTO {
    reference: string,
    quantity: number,
    unitPrice: number,
}

export class OrderLine{
    constructor(
        public readonly reference : string,
        public readonly quantity : number,
        public readonly unitPrice : number,
    ) {}

    static create(payload : OrderLineDTO) : OrderLine {
        return new OrderLine(payload.reference, payload.quantity, payload.unitPrice);
    }
}