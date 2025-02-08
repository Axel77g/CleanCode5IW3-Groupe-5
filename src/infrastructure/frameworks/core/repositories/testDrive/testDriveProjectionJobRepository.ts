import {
    MongoTestDriveProjectionJobRepository
} from "@infrastructure/common/repositories/mongo/testDrive/MongoTestDriveProjectionJobRepository";
import client from "@infrastructureCore/mongo";

export const testDriveProjectionJobRepository = new MongoTestDriveProjectionJobRepository(client)