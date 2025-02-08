import { MongoMaintenanceEventRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoMaintenanceEventRepository";
import client from "@infrastructureCore/mongo";
import {eventObserver} from "@infrastructureCore/observers/eventObserver";

export const maintenanceEventRepository = new MongoMaintenanceEventRepository(client, eventObserver);