import {stockRepository} from "@infrastructureCore/repositories/inventoryManagement/stockRepository";
import {StockProjection} from "@application/inventoryManagement/projections/StockProjection";
import {inventorySparePartRepository} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";

export const stockProjection = new StockProjection(stockRepository, inventorySparePartRepository)