import {
    MongoTestDriveProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/testDrive/MongoTestDriveProjectionJobRepository";
import client from "@expressApp/mongo";

export const testDriveProjectionJobRepository = new MongoTestDriveProjectionJobRepository(client)