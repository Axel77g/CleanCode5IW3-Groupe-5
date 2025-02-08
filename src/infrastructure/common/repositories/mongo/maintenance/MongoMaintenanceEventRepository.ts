import { MongoEventRepository } from "../shared/MongoEventRepository";

export class MongoMaintenanceEventRepository extends MongoEventRepository {
    protected collectionName: string = "maintenanceEvents"
}