import {
    MongoInventoryManagementEventRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventoryManagementEventRepository";
import client from "@expressApp/mongo";
import {eventObserver} from "@expressApp/observers/eventObserver";

export const inventoryManagementEventRepository = new MongoInventoryManagementEventRepository(client, eventObserver)