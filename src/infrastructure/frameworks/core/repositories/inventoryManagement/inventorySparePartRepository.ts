import {
    MongoInventorySparePartRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventorySparePartRepository";
import client from "@infrastructureCore/mongo";
export const inventorySparePartRepository = new MongoInventorySparePartRepository(client)