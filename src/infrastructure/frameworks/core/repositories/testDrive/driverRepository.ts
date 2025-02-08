import {MongoDriverRepository} from "../../../../common/repositories/mongo/testDrive/MongoDriverRepository";
import client from "@infrastructureCore/mongo";

export const driverRepository = new MongoDriverRepository(client)