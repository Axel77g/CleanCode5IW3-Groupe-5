import client from "@expressApp/mongo";
import { MongoMaintenanceProjectionJobRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoMaintenanceProjectionJobRepository";

export const maintenanceProjectionJobRepository = new MongoMaintenanceProjectionJobRepository(client);