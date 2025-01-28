import { GarageRepository } from '@application/maintenance/repositories/GarageRepository';
import { Garage } from "@domain/maintenance/entities/Garage";
import { Siret } from "@domain/shared/value-object/Siret";
import { GarageMapper } from "@infrastructure/common/entityMappers/GarageMapper";
import { ApplicationException } from "@shared/ApplicationException";
import { Result, VoidResult } from "@shared/Result";
import { AbstractMongoRepository } from "../AbstractMongoRepository";

export class MongoGarageRepository extends AbstractMongoRepository implements GarageRepository {
    protected collectionName: string = 'garages';

    getBySiret(siret: Siret): Promise<Result<Garage>> {
        return this.catchError(
            async () => {
                const garageDocument = await this.getCollection().findOne({ siret: siret.getValue() });
                const garage = GarageMapper.toDomain(garageDocument);
                if (garage instanceof ApplicationException) return Result.Failure(garage);
                return Result.Success<Garage>(garage);
            },
        )
    }

    show(siret: Siret): Promise<Result<Garage>> {
        return this.catchError(
            async () => {
                const garageDocument = await this.getCollection().findOne({ siret: siret });
                const garage = GarageMapper.toDomain(garageDocument);
                if (garage instanceof ApplicationException) return Result.Failure(garage);
                return Result.Success<Garage>(garage);
            },
        )
    }

    store(garage: Garage): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                const garageDocument = GarageMapper.toPersistence(garage);
                await this.getCollection().insertOne(garageDocument);
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(siret: Siret): Promise<VoidResult> {
        const sesion = this.getSessionTransaction();
        return this.catchError(
            async () => {
                sesion.startTransaction();
                await this.getCollection().deleteOne({ siret });
                await sesion.commitTransaction();
                return Result.SuccessVoid();
            },
            sesion.abortTransaction.bind(sesion),
        )
    }
}