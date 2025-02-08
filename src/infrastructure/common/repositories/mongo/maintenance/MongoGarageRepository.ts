import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {Garage} from "@domain/maintenance/entities/Garage";
import {GarageRepository} from "@application/maintenance/repositories/GarageRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {PaginatedInput} from "@shared/PaginatedInput";
import {GarageMapper} from "@infrastructure/common/entityMappers/GarageMapper";

export class MongoGarageRepository extends AbstractMongoRepository implements GarageRepository {
    protected collectionName: string = "garages"

    deleteGarage(siret: Siret): Promise<VoidResult> {
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

    getBySiret(siret: Siret): Promise<OptionalResult<Garage>> {
        return this.catchError(
            async () =>{
                const garageDocument = await this.getCollection().findOne({siret: siret.getValue()});
                if(!garageDocument) return Result.SuccessVoid();
                const garage = GarageMapper.toDomain(garageDocument);
                if(garage instanceof ApplicationException) return Result.Failure(garage);
                return Result.Success<Garage>(garage);
            }
        )
    }

    async store(garage: Garage): Promise<VoidResult> {
        const session=  this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ siret: garage.siret.getValue() }, { $set: GarageMapper.toPersistence(garage) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    listGarages(pagination: PaginatedInput): Promise<PaginatedResult<Garage>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const garagesDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit).toArray();
                const garagesTotal = await this.getCollection().countDocuments();
                const garages = GarageMapper.toDomainList(garagesDocuments);
                return Result.SuccessPaginated<Garage>(garages, garagesTotal, page, limit);
            }
        )
    }
}