import client from "@expressApp/mongo";
import { MongoCustomerRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoCustomerRepository";
export const customerRepository = new MongoCustomerRepository(client);
