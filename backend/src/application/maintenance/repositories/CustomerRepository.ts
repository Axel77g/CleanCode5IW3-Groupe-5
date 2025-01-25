import { Customer } from "@domain/maintenance/entities/Customer";
import { IRepository } from "@shared/IRepository";
import {OptionalResult, VoidResult} from "@shared/Result";

export interface CustomerRepository extends IRepository {
    find(customerId: string): Promise<OptionalResult<Customer>>;
    store(customer: Customer): Promise<VoidResult>;
    delete(customerId: string): Promise<VoidResult>;
}