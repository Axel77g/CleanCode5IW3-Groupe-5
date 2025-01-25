import {ApplicationException} from "@shared/ApplicationException";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {Siret} from "@domain/shared/value-object/Siret";

export interface StockInventorySparePartAction {
    stock : StockInventorySparePart,
    event : DealerStockUpdatedEvent
}

export class StockInventorySparePart {
    static errors = {
        QUANTITY_NEGATIVE: new ApplicationException("Stock.QuantityNegative", "Quantity cannot be negative"),
        RUN_OUT: new ApplicationException("Stock.RunOut", "Stock run out")
    }

    private constructor(
        public readonly siret : Siret,
        public readonly sparePartReference: string,
        public quantity: number,
    ) {}


    add(quantity: number): StockInventorySparePartAction {
        return {
            stock : new StockInventorySparePart(this.siret, this.sparePartReference, this.quantity + quantity),
            event : this.getEvent(quantity)
        }
    }

    remove(quantity: number): StockInventorySparePartAction | ApplicationException {
        if(this.quantity < quantity) return StockInventorySparePart.errors.RUN_OUT;
        return {
            stock : new StockInventorySparePart(this.siret, this.sparePartReference, this.quantity - quantity),
            event : this.getEvent(-quantity)
        }
    }

    needToNotifyLowStock() : boolean {
        return this.quantity <= 5;
    }

    private getEvent(quantity: number): DealerStockUpdatedEvent {
        return new DealerStockUpdatedEvent({
            sparePartReference: this.sparePartReference,
            siret: this.siret.getValue(),
            quantity
        })
    }

    static create(object : {siret : Siret, sparePartReference: string, quantity: number}) : StockInventorySparePart | ApplicationException {
        if(object.quantity < 0) return StockInventorySparePart.errors.QUANTITY_NEGATIVE;
        return new StockInventorySparePart(object.siret, object.sparePartReference, object.quantity);
    }

}