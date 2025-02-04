import { GarageRepository } from '@application/maintenance/repositories/GarageRepository';
import { Garage } from "@domain/maintenance/entities/Garage";
import { Siret } from "@domain/shared/value-object/Siret";
import { GarageMapper } from "@infrastructure/common/entityMappers/GarageMapper";
import { ApplicationException } from "@shared/ApplicationException";
import { PaginatedInput } from '@shared/PaginatedInput';
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {AbstractMongoRepository} from "../AbstractMongoRepository";

export class MongoGarageRepository extends AbstractMongoRepository implements GarageRepository {

    protected collectionName: string = 'garages';

    getBySiret(siret: Siret): Promise<OptionalResult<Garage>> {
        return this.catchError(
            async () => {
                const garageDocument = await this.getCollection().findOne({ siret: siret.getValue() });
                const garage = GarageMapper.toDomain(garageDocument);
                if (garage instanceof ApplicationException) return Result.Failure(garage);
                return Result.Success<Garage>(garage);
            },
        )
    }

    // show(siret: Siret): Promise<Result<Garage>> {
    //     return this.catchError(
    //         async () => {
    //             const garageDocument = await this.getCollection().findOne({ siret: siret });
    //             const garage = GarageMapper.toDomain(garageDocument);
    //             if (garage instanceof ApplicationException) return Result.Failure(garage);
    //             return Result.Success<Garage>(garage);
    //         },
    //     )
    // }

    async store(garage: Garage): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ siret: garage.siret.getValue() }, { $set: GarageMapper.toPersistence(garage) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(siret: Siret): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ siret });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    list(pagination: PaginatedInput): Promise<PaginatedResult<Garage>> {
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