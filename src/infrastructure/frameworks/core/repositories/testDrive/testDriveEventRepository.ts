import {
    MongoTestDriveEventRepository
} from "@infrastructure/common/repositories/mongo/testDrive/MongoTestDriveEventRepository";
import client from "@infrastructureCore/mongo";
import {eventObserver} from "@infrastructureCore/observers/eventObserver";
export const testDriveEventRepository = new MongoTestDriveEventRepository(client, eventObserver)