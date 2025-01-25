import { MongoGarageRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoGarageRepository";
import client from "@infrastructureCore/mongo";

export const garageRepository = new MongoGarageRepository(client)