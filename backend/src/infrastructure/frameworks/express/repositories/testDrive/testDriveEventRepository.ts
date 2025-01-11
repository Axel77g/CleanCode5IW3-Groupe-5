import {
    MongoTestDriveEventRepository
} from "../../../../common/repositories/mongo/testDrive/MongoTestDriveEventRepository";
import client from "../../mongo";
import {eventObserver} from "../../observers/eventObserver";

export const testDriveEventRepository = new MongoTestDriveEventRepository(client, eventObserver)