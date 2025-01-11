import {MongoDealerRepository} from "@infrastructure/common/repositories/mongo/inventoryManagement/MongoDealerRepository";
import client from "@expressApp/mongo";
export const dealerRepository = new MongoDealerRepository(client)