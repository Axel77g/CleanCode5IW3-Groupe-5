import { MongoCustomerRepository } from "@infrastructure/common/repositories/mongo/maintenance/MongoCustomerRepository";
import client from "@infrastructureCore/mongo";

export const customerRepository = new MongoCustomerRepository(client);
