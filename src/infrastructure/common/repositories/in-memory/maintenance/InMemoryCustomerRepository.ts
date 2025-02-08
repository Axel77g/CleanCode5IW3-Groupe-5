import { CustomerRepository } from "@application/maintenance/repositories/CustomerRepository";
import { Customer } from "@domain/maintenance/entities/Customer";
import { PaginatedInput } from "@shared/PaginatedInput";
import { OptionalResult, PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractInMemoryRepository } from "../AbstractInMemoryRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

export class InMemoryCustomerRepository extends AbstractInMemoryRepository<Customer> implements CustomerRepository {

    async listCustomerVehicles(customerId: string, pagination: PaginatedInput): Promise<PaginatedResult<VehicleImmatriculation>> {
        const customer = this.collection.findOne('customerId', customerId)
        if (!customer) return Result.FailureStr("Cannot find customer")
        const vehicles = customer.vehicleImmatriculations
        const total = vehicles.length
        const page = pagination.page
        const limit = pagination.limit
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedVehicles = vehicles.slice(start, end)
        return Result.SuccessPaginated<VehicleImmatriculation>(paginatedVehicles, total, page, limit)
    }

    async listCustomers(pagination: PaginatedInput): Promise<PaginatedResult<Customer>> {
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

    async update(customer: Customer): Promise<VoidResult> {
        this.collection.upsert('customerId', customer.customerId, customer)
        return Result.SuccessVoid()
    }

    async getCustomerByVehicleImmatriculation(vehicleImmatriculation: VehicleImmatriculation): Promise<OptionalResult<Customer>> {
        const customers = this.collection.toArray()
        const foundCustomer = customers.find(customer => customer.vehicleImmatriculations.some(vehicle => vehicle.getValue() === vehicleImmatriculation.getValue()))
        if(!foundCustomer) return Result.SuccessVoid()
        return Result.Success(foundCustomer)
    }




}