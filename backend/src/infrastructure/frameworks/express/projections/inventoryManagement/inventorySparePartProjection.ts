import {InventorySparePartProjection} from "@application/inventoryManagement/projections/InventorySparePartProjection";
import {inventorySparePartRepository} from "@expressApp/repositories/inventoryManagement/inventorySparePartRepository";

export const inventorySparePartProjection = new InventorySparePartProjection(inventorySparePartRepository)