import { CustomerRepository } from '@application/maintenance/repositories/CustomerRepository';
import { Customer } from '@domain/maintenance/entities/Customer';
import { CustomerMapper } from '@infrastructure/common/entityMappers/CustomerMapper';
import { AbstractMongoRepository } from '@infrastructure/common/repositories/mongo/AbstractMongoRepository';
import { ApplicationException } from "@shared/ApplicationException";
import { PaginatedInput } from '@shared/PaginatedInput';
import { OptionalResult, PaginatedResult, Result, VoidResult } from '@shared/Result';

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
                const customerDocument = CustomerMapper.toPersistence(customer);
                await this.getCollection().insertOne(customerDocument);
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

    list(pagination: PaginatedInput): Promise<PaginatedResult<Customer>> {
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
}