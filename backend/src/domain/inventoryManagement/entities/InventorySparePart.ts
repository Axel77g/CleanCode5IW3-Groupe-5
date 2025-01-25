import {UpsertInventorySparePartEvent} from "@domain/inventoryManagement/events/UpsertInventorySparePartEvent";
import {ApplicationException} from "@shared/ApplicationException";

export interface InventorySparePartDTO {
    reference:  string,
    name : string
}

export class InventorySparePart{
    public static readonly REFERENCE_MIN_LENGTH = 5;
    public static readonly NAME_MIN_LENGTH = 2;

    private constructor(
        public readonly reference: string,
        public readonly name: string,
    ) {}

    public setName(name: string): InventorySparePart {
        return new InventorySparePart(this.reference, name);
    }


    static fromObject(object : InventorySparePartDTO) : InventorySparePart | ApplicationException {
        return InventorySparePart.create(object);
    }

    static create(sparePart: InventorySparePartDTO): InventorySparePart | ApplicationException {
        if(sparePart.name.length < this.NAME_MIN_LENGTH) return new ApplicationException("InventorySparePart.NameTooShort",`Name must be at least ${InventorySparePart.NAME_MIN_LENGTH} characters long`);
        if(sparePart.reference.length < this.REFERENCE_MIN_LENGTH) return new ApplicationException("InventorySparePart.ReferenceTooShort",`Reference must be at least ${InventorySparePart.REFERENCE_MIN_LENGTH} characters long`);
        return new InventorySparePart(sparePart.reference, sparePart.name);
    }

    upsertEvent() : UpsertInventorySparePartEvent{
        return new UpsertInventorySparePartEvent({
            reference: this.reference,
            name: this.name
        })
    }

}