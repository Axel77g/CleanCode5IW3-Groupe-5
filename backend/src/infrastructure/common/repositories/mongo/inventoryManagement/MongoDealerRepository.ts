import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {DealerRepository} from "@application/inventoryManagement/repositories/DealerRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result, VoidResult} from "@shared/Result";
import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {DealerMapper} from "@infrastructure/common/entityMappers/DealerMapper";


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

    getBySiret(siret: Siret): Promise<Result<Dealer>> {
        return this.catchError<Result<Dealer>>(
            async () =>{
                const dealerDocument = await this.getQuery().findOne({siret: siret.getValue()});
                const dealer = DealerMapper.toDomain(dealerDocument);
                if(dealer instanceof Error) return Result.Failure(dealer);
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

}