import {
    MongoProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/shared/MongoProjectionJobRepository";

export class MongoTestDriveProjectionJobRepository extends MongoProjectionJobRepository{
    protected collectionName: string = 'testDriveProjectionJobs';
}