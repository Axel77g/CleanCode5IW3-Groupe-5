import { DealerRepository } from "@application/inventoryManagement/repositories/DealerRepository";
import { Dealer } from "@domain/inventoryManagement/entities/Dealer";
import { Siret } from "@domain/shared/value-object/Siret";
import { DealerMapper } from "@infrastructure/common/entityMappers/DealerMapper";
import { PaginatedInput } from "@shared/PaginatedInput";
import { PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractMongoRepository } from "../AbstractMongoRepository";


export class MongoDealerRepository extends AbstractMongoRepository implements DealerRepository {
    protected collectionName: string = "dealers";

    delete(siret: Siret): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError<VoidResult>(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ siret: siret.getValue() });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    getBySiret(siret: Siret): Promise<Result<Dealer>> {
        return this.catchError<Result<Dealer>>(
            async () => {
                const dealerDocument = await this.getCollection().findOne({ siret: siret.getValue() });
                const dealer = DealerMapper.toDomain(dealerDocument);
                if (dealer instanceof Error) return Result.Failure(dealer);
                return Result.Success<Dealer>(dealer);
            }
        )
    }

    async store(dealer: Dealer): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ siret: dealer.siret.getValue() }, { $set: DealerMapper.toPersistence(dealer) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    list(pagination: PaginatedInput): Promise<PaginatedResult<Dealer>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const dealersDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit).toArray();
                const dealersTotal = await this.getCollection().countDocuments();
                const dealers = DealerMapper.toDomainList(dealersDocuments);
                return Result.SuccessPaginated<Dealer>(dealers, dealersTotal, page, limit);
            }
        )
    }

}