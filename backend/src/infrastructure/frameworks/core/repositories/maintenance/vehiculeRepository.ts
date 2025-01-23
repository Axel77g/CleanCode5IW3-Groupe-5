import { MongoVehiculeRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoVehiculeRepository";
import client from "@infrastructureCore/mongo";

export const vehiculeRepository = new MongoVehiculeRepository(client);