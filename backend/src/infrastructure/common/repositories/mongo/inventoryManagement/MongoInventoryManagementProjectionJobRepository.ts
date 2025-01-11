import {
    MongoProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/shared/MongoProjectionJobRepository";

export class MongoInventoryManagementProjectionJobRepository extends MongoProjectionJobRepository{
    protected collectionName: string = 'inventoryManagementProjectionJobs';
}