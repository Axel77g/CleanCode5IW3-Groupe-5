import {
    MongoTestDriveProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/testDrive/MongoTestDriveProjectionJobRepository";
import client from "@expressApp/mongo";

export const testDriveEventProjectionJobRepository = new MongoTestDriveProjectionJobRepository(client)