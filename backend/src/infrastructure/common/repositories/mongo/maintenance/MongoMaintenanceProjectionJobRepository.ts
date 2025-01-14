import { MongoProjectionJobRepository } from "../shared/MongoProjectionJobRepository";

export class MongoMaintenanceProjectionJobRepository extends MongoProjectionJobRepository {
    protected collectionName: string = "maintenanceProjectionJobs"
}