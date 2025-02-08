import {
    MongoInventoryManagementEventRepository
} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoInventoryManagementEventRepository";
import client from "@infrastructureCore/mongo";
import {eventObserver} from "@infrastructureCore/observers/eventObserver";

export const inventoryManagementEventRepository = new MongoInventoryManagementEventRepository(client, eventObserver)