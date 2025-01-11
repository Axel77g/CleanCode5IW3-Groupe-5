import {StockRepository} from "../repositories/StockRepository";
import {IEvent} from "@shared/AbstractEvent";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {InventorySparePartRepository} from "../repositories/InventorySparePartRepository";
import {Siret} from "@domain/shared/value-object/Siret";

export class StockProjection {
    constructor(private _stockRepository: StockRepository, private _inventorySparePartRepository : InventorySparePartRepository) {}

    async receive(event: IEvent): Promise<void> {
        switch (event.constructor) {
            case DealerStockUpdatedEvent:
                await this.applyDealerStockUpdatedEvent(event as DealerStockUpdatedEvent)
                break;
        }
    }

    async applyDealerStockUpdatedEvent(event: DealerStockUpdatedEvent) {
        const sparePart = await this._inventorySparePartRepository.find(event.payload.sparePartReference)
        if(!sparePart.success) return console.error(sparePart)
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof Error) return console.error(siret)
        await this._stockRepository.update(sparePart.value, siret, event.payload.quantity)
    }
}