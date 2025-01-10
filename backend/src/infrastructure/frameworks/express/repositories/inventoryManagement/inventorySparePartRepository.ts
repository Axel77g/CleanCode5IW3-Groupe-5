import {
    MongoInventorySparePartRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventorySparePartRepository";
import client from "../../mongo";
export const inventorySparePartRepository = new MongoInventorySparePartRepository(client)