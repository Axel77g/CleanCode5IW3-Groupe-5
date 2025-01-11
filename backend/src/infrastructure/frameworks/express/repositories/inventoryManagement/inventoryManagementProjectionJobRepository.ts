import {
    MongoInventoryManagementProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventoryManagementProjectionJobRepository";
import client from "@expressApp/mongo";

export const inventoryManagementProjectionJobRepository = new MongoInventoryManagementProjectionJobRepository(client)