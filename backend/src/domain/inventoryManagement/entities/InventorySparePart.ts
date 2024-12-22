export class InventorySparePart{
    constructor(
        public readonly reference: string,
        public readonly name: string,
    ) {}


    public setName(name: string): InventorySparePart{
        return new InventorySparePart(this.reference, name);
    }
}