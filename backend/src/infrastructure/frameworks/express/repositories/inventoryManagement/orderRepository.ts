import {MongoOrderRepository} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoOrderRepository";
import client from "../../mongo";

export const orderRepository = new MongoOrderRepository(client)