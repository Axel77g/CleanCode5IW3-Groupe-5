import { Customer } from "@domain/maintenance/entities/Customer";
import { IRepository } from "@shared/IRepository";
import { PaginatedInput } from "@shared/PaginatedInput";
import { OptionalResult, PaginatedResult, VoidResult } from "@shared/Result";

export interface CustomerRepository extends IRepository {
    list(pagination: PaginatedInput): Promise<PaginatedResult<Customer>>;
    find(customerId: string): Promise<OptionalResult<Customer>>;
    store(customer: Customer): Promise<VoidResult>;
    delete(customerId: string): Promise<VoidResult>;
}