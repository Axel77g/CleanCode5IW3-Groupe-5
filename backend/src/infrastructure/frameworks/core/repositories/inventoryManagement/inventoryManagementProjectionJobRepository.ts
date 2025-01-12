import {
    MongoInventoryManagementProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventoryManagementProjectionJobRepository";
import client from "@infrastructureCore/mongo";

export const inventoryManagementProjectionJobRepository = new MongoInventoryManagementProjectionJobRepository(client)