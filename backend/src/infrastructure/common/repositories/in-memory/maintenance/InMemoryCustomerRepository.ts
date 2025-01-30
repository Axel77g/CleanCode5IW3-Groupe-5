import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { PaginatedInput } from "@shared/PaginatedInput";
import { OptionalResult, PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";

export class InMemoryCustomerRepository extends AbstractInMemoryRepository<Customer> implements CustomerRepository {
    async list(pagination: PaginatedInput): Promise<PaginatedResult<Customer>> {
        const { page, limit } = pagination
        const customers = this.collection.paginate(page, limit).toArray()
        const total = this.collection.count()
        return Promise.resolve(Result.SuccessPaginated(customers, total, page, limit))
    }

    async find(customerId: string): Promise<OptionalResult<Customer>> {
        const customer = this.collection.findOne('customerId', customerId)
        return customer ? Result.Success(customer) : Result.SuccessVoid()
    }

    async store(customer: Customer): Promise<VoidResult> {
        this.collection.add(customer)
        return Result.SuccessVoid()
    }

    async delete(customerId: string): Promise<VoidResult> {
        this.collection.remove('customerId', customerId)
        return Result.SuccessVoid()
    }
}