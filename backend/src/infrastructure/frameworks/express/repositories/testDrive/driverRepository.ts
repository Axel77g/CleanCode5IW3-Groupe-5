import {MongoDriverRepository} from "../../../../common/repositories/mongo/testDrive/MongoDriverRepository";
import client from "../../mongo";

export const driverRepository = new MongoDriverRepository(client)