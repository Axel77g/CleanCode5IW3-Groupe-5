import { MongoVehicleRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoVehicleRepository";
import client from "@infrastructureCore/mongo";

export const vehicleRepository = new MongoVehicleRepository(client);