import {StockRepository} from "../repositories/StockRepository";
import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {InventorySparePartRepository} from "../repositories/InventorySparePartRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";

export class StockProjection extends AbstractProjection {
    constructor(private _stockRepository: StockRepository, private _inventorySparePartRepository : InventorySparePartRepository) { super() }

    init(projectionJobScheduler : ProjectionJobScheduler){
        projectionJobScheduler.schedule(DealerStockUpdatedEvent.type, this.constructor.name)
    }

    bindEvents(){
        return {
            [DealerStockUpdatedEvent.type] : this.applyDealerStockUpdatedEvent
        }
    }

    async applyDealerStockUpdatedEvent(event: DealerStockUpdatedEvent) : Promise<VoidResult> {
        const sparePartResponse = await this._inventorySparePartRepository.find(event.payload.sparePartReference)
        if(!sparePartResponse.success) return sparePartResponse
        if(sparePartResponse.value === null) return Result.Failure(NotFoundEntityException.create("Spare part not found"))
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof Error) return Result.Failure(siret)
        return this._stockRepository.update(sparePartResponse.value, siret, event.payload.quantity)
    }
}