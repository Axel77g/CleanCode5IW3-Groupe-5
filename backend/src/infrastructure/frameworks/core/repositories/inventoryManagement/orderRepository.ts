import {MongoOrderRepository} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoOrderRepository";
import client from "@infrastructureCore/mongo";

export const orderRepository = new MongoOrderRepository(client)