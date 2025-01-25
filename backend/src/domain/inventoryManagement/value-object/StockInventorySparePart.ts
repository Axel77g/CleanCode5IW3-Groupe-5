import {ApplicationException} from "@shared/ApplicationException";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {Siret} from "@domain/shared/value-object/Siret";

interface StockInventorySparePartAction {
    stock : StockInventorySparePart,
    event : DealerStockUpdatedEvent
}

export class StockInventorySparePart {
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
        if(this.quantity < quantity) return new ApplicationException("Stock.RunOut", "Stock run out");
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
        if(object.quantity < 0) return new ApplicationException("Stock.QuantityNegative", "Quantity cannot be negative");
        return new StockInventorySparePart(object.siret, object.sparePartReference, object.quantity);
    }

}