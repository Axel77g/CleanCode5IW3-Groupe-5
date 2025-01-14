import { MongoMaintenanceProjectionJobRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoMaintenanceProjectionJobRepository";
import client from "@infrastructureCore/mongo";

export const maintenanceProjectionJobRepository = new MongoMaintenanceProjectionJobRepository(client);