import { Customer } from "@domain/maintenance/entities/Customer";
import { IRepository } from "@shared/IRepository";
import { Result, VoidResult } from "@shared/Result";

export interface CustomerRepository extends IRepository {
    find(customerId: string): Promise<Result<Customer>>;
    store(customer: Customer): Promise<VoidResult>;
    delete(customerId: string): Promise<VoidResult>;
}