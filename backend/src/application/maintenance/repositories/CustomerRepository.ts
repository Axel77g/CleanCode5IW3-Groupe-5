import { Customer } from "@domain/maintenance/entities/Customer";
import { IRepository } from "@shared/IRepository";
import { PaginatedInput } from "@shared/PaginatedInput";
import { OptionalResult, PaginatedResult, VoidResult } from "@shared/Result";
import {Vehicule} from "@domain/maintenance/entities/Vehicule";

export interface CustomerRepository extends IRepository {
    listCustomers(pagination: PaginatedInput): Promise<PaginatedResult<Customer>>;
    find(customerId: string): Promise<OptionalResult<Customer>>;
    store(customer: Customer): Promise<VoidResult>;
    delete(customerId: string): Promise<VoidResult>;
    listCustomerVehicules(customerId: string, pagination: PaginatedInput): Promise<PaginatedResult<Vehicule>>;
}