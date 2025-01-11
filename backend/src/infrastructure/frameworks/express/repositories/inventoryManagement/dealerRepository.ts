import client from "@expressApp/mongo";
import { MongoDealerRepository } from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoDealerRepository";
export const dealerRepository = new MongoDealerRepository(client)