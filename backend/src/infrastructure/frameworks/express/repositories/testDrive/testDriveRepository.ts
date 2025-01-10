import {MongoTestDriveRepository} from "../../../../common/repositories/mongo/testDrive/MongoTestDriveRepository";
import client from "../../mongo";

export const testDriveRepository = new MongoTestDriveRepository(client)