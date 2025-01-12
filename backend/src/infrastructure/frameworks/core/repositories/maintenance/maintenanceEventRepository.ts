import client from "@expressApp/mongo";
import { MongoMaintenanceEventRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoMaintenanceEventRepository";
import { eventObserver } from "../../observers/eventObserver";

export const maintenanceEventRepository = new MongoMaintenanceEventRepository(client, eventObserver);