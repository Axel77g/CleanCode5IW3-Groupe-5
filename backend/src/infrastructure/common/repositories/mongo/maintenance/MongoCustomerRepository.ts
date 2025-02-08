import { CustomerRepository } from '@application/maintenance/repositories/CustomerRepository';
import { Customer } from '@domain/maintenance/entities/Customer';
import { CustomerMapper } from '@infrastructure/common/entityMappers/CustomerMapper';
import { AbstractMongoRepository } from '@infrastructure/common/repositories/mongo/AbstractMongoRepository';
import {ApplicationException } from "@shared/ApplicationException";
import { PaginatedInput } from '@shared/PaginatedInput';
import { OptionalResult, PaginatedResult, Result, VoidResult } from '@shared/Result';
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export class MongoCustomerRepository extends AbstractMongoRepository implements CustomerRepository {
    protected collectionName: string = 'customers';

    find(customerId: string): Promise<OptionalResult<Customer>> {
        return this.catchError(
            async () => {
                const customerDocument = await this.getCollection().findOne({ customerId: customerId });
                if (!customerDocument) return Result.SuccessVoid();
                const customer = CustomerMapper.toDomain(customerDocument);
                if (customer instanceof ApplicationException) return Result.Failure(customer);
                return Result.Success<Customer>(customer);
            },
        )
    }

    store(customer: Customer): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({customerId: customer.customerId,}, {$set: CustomerMapper.toPersistence(customer),}, {upsert: true,})
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(customerId: string): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ customerId });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    async listCustomers(pagination: PaginatedInput): Promise<PaginatedResult<Customer>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const customersDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit).toArray();
                const customersTotal = await this.getCollection().countDocuments();
                const customers = CustomerMapper.toDomainList(customersDocuments);
                return Result.SuccessPaginated<Customer>(customers, customersTotal, page, limit);
            }
        );
    }

    listCustomerVehicules(customerId: string, pagination: PaginatedInput): Promise<PaginatedResult<VehiculeImmatriculation>> {
        const { page, limit } = pagination;
        return this.catchError(async () => {
            const customerDocument = await this.getCollection().findOne({ customerId });
            if (!customerDocument) return Result.FailureStr("Customer not found");
            const customer = CustomerMapper.toDomain(customerDocument);
            if (customer instanceof ApplicationException) return Result.Failure(customer);
            const vehicules = customer.vehiculeImmatriculations;
            const vehiculesTotal = vehicules.length;
            const vehiculesPaginated = vehicules.slice((page - 1) * limit, page * limit);
            return Result.SuccessPaginated<VehiculeImmatriculation>(vehiculesPaginated, vehiculesTotal, page, limit
            );
        });
    }
}