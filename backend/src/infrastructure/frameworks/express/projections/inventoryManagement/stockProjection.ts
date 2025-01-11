import {stockRepository} from "@expressApp/repositories/inventoryManagement/stockRepository";
import {StockProjection} from "@application/inventoryManagement/projections/StockProjection";
import {inventorySparePartRepository} from "@expressApp/repositories/inventoryManagement/inventorySparePartRepository";

export const stockProjection = new StockProjection(stockRepository, inventorySparePartRepository)