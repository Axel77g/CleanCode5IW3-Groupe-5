import client from "../../mongo";
import {MongoStockRepository} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoStockRepository";

export const stockRepository = new MongoStockRepository(client)