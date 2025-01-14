import { MongoGarageRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoGarageRepository";
import client from "../../mongo";

export const GarageRepository = new MongoGarageRepository(client)