import {
    MongoVehiculeBreakdownRepository
} from "@infrastructure/common/repositories/mongo/maintenance/MongoVehiculeBreakdownRepository";
import client from "@infrastructureCore/mongo";

export const vehiculeBreakdownRepository = new MongoVehiculeBreakdownRepository(client);