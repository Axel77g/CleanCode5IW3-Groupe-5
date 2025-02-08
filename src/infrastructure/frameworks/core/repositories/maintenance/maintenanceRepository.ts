import client from "@infrastructureCore/mongo";
import {
    MongoMaintenanceRepository
} from "@infrastructure/common/repositories/mongo/maintenance/MongoMaintenanceRepository";

export const maintenanceRepository = new MongoMaintenanceRepository(client);