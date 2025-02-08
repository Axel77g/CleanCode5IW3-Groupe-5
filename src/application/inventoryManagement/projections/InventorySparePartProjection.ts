import {UpsertInventorySparePartEvent} from "@domain/inventoryManagement/events/UpsertInventorySparePartEvent";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {Result, VoidResult} from "@shared/Result";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {ApplicationException} from "@shared/ApplicationException";

export class InventorySparePartProjection extends AbstractProjection{
    constructor(private _inventorySparePartRepository: InventorySparePartRepository) { super() }

    init(projectionJobScheduler : ProjectionJobScheduler){
        projectionJobScheduler.schedule(UpsertInventorySparePartEvent.type, this.constructor.name)
    }

    bindEvents() {
        return {
            [UpsertInventorySparePartEvent.type] : this.applyUpsertInventorySparePartEvent
        }
    }

    async applyUpsertInventorySparePartEvent(event: UpsertInventorySparePartEvent) : Promise<VoidResult> {
        const inventorySparePart = InventorySparePart.create(event.payload)
        if(inventorySparePart instanceof ApplicationException) return Result.Failure(inventorySparePart)
        return this._inventorySparePartRepository.store(inventorySparePart)
    }
}