import {UpsertInventorySparePartEvent} from "@domain/inventoryManagement/events/UpsertInventorySparePartEvent";
import {InventorySparePartRepository} from "../repositories/InventorySparePartRepository";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {ProjectionJobScheduler} from "@application/shared/projections/ProjectionJobScheduler";
import {VoidResult} from "@shared/Result";

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

    applyUpsertInventorySparePartEvent(event: UpsertInventorySparePartEvent) : Promise<VoidResult> {
        return this._inventorySparePartRepository.store(InventorySparePart.fromObject(event.payload))
    }
}