import {
    MongoVehicleBreakdownRepository
} from "@infrastructure/common/repositories/mongo/maintenance/MongoVehicleBreakdownRepository";
import client from "@infrastructureCore/mongo";

export const vehicleBreakdownRepository = new MongoVehicleBreakdownRepository(client);