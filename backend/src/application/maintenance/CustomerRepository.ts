import { Customer } from "../../domain/maintenance/entities/Customer";
import { VehicleImmatriculation } from "../../domain/shared/value-object/VehicleImmatriculation";
import { IRepository } from "../../shared/IRepository";
import { Result, VoidResult } from "../../shared/Result";

export interface CustomerRepository extends IRepository {
    find(vehiculeImmatriculation: VehicleImmatriculation): Promise<Result<Customer>>;
    store(customer: Customer): Promise<VoidResult>;
    update(customer: Customer): Promise<VoidResult>;
    delete(customer: Customer): Promise<VoidResult>;
}