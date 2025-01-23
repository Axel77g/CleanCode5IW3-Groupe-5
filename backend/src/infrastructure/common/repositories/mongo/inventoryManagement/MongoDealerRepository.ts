import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {DealerMapper} from "@infrastructure/common/entityMappers/DealerMapper";
import {PaginatedInput} from "@shared/PaginatedInput";
import {ApplicationException} from "@shared/ApplicationException";


export class MongoDealerRepository extends AbstractMongoRepository implements DealerRepository{
    protected collectionName: string = "dealers";

    delete(siret: Siret): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError<VoidResult>(
            async () => {
                session.startTransaction();
                await this.getQuery().deleteOne({siret: siret.getValue()});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    getBySiret(siret: Siret): Promise<OptionalResult<Dealer>> {
        return this.catchError(
            async () =>{
                const dealerDocument = await this.getQuery().findOne({siret: siret.getValue()});
                if(!dealerDocument) return Result.SuccessEmpty();
                const dealer = DealerMapper.toDomain(dealerDocument);
                if(dealer instanceof ApplicationException) return Result.Failure(dealer);
                return Result.Success<Dealer>(dealer);
            }
        )
    }

    async store(dealer: Dealer): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getQuery().updateOne({siret: dealer.siret.getValue()}, {$set: DealerMapper.toPersistence(dealer)}, {upsert: true});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    list(pagination: PaginatedInput): Promise<PaginatedResult<Dealer>> {
        const {page, limit} = pagination;
        return this.catchError(
            async () => {
                const dealersDocuments = await this.getQuery().find().skip((page - 1) * limit).limit(limit).toArray();
                const dealersTotal = await this.getQuery().countDocuments();
                const dealers = DealerMapper.toDomainList(dealersDocuments);
                return Result.SuccessPaginated<Dealer>(dealers, dealersTotal, page, limit);
            }
        )
    }

}