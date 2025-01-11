
export class StockInventorySparePart {
    private constructor(
        public readonly sparePartReference: string,
        public quantity: number,
    ) {}


    add(quantity: number): void {
        this.quantity += quantity;
    }

    static create(object : {sparePartReference: string, quantity: number}) : StockInventorySparePart {
        return new StockInventorySparePart(object.sparePartReference, object.quantity);
    }
}