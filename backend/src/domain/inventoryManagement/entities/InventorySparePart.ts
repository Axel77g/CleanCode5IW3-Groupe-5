
export interface InventorySparePartDTO {
    reference:  string,
    name : string
}

export class InventorySparePart{
    private constructor(
        public readonly reference: string,
        public readonly name: string,
    ) {}

    public setName(name: string): InventorySparePart{
        return new InventorySparePart(this.reference, name);
    }


    static fromObject(object : InventorySparePartDTO) : InventorySparePart {
        return new InventorySparePart(object.reference, object.name);
    }

}