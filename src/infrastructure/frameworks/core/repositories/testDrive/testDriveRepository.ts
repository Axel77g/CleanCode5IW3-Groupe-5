import {MongoTestDriveRepository} from "../../../../common/repositories/mongo/testDrive/MongoTestDriveRepository";
import client from "@infrastructureCore/mongo";

export const testDriveRepository = new MongoTestDriveRepository(client)