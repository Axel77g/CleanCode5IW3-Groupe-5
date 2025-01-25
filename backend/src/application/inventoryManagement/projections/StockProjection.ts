import {DealerStockUpdatedEvent} from "@domain/inventoryManagement/events/DealerStockUpdatedEvent";
import {Siret} from "@domain/shared/value-object/Siret";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {StockRepository} from "@application/inventoryManagement/repositories/StockRepository";

export class StockProjection extends AbstractProjection {
    constructor(private _stockRepository: StockRepository, private _inventorySparePartRepository : InventorySparePartRepository) { super() }

    init(projectionJobScheduler : ProjectionJobScheduler){
        projectionJobScheduler.schedule(DealerStockUpdatedEvent.type, this.constructor.name)
        projectionJobScheduler.schedule(UnregisterDealerEvent.type, this.constructor.name)
    }

    bindEvents(){
        return {
            [DealerStockUpdatedEvent.type] : this.applyDealerStockUpdatedEvent,
            [UnregisterDealerEvent.type] : this.applyUnregisterDealerEvent
        }
    }

    async applyDealerStockUpdatedEvent(event: DealerStockUpdatedEvent) : Promise<VoidResult> {
        const sparePartResponse = await this._inventorySparePartRepository.find(event.payload.sparePartReference)
        if(!sparePartResponse.success) return sparePartResponse
        if(sparePartResponse.empty) return Result.Failure(NotFoundEntityException.create("Spare part not found"))
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        return this._stockRepository.update(sparePartResponse.value, siret, event.payload.quantity)
    }

    async applyUnregisterDealerEvent(event: UnregisterDealerEvent) : Promise<VoidResult> {
        const siret = Siret.create(event.payload.siret)
        if(siret instanceof ApplicationException) return Result.Failure(siret)
        return this._stockRepository.deleteByDealerSiret(siret)
    }
}