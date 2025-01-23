import { VehiculeRepository } from '@application/maintenance/repositories//VehiculeRepository';
import { Vehicule } from '@domain/maintenance/entities/Vehicule';
import { VehiculeImmatriculation } from '@domain/maintenance/value-object/VehiculeImmatriculation';
import { VehiculeMapper } from '@infrastructure/common/entityMappers/VehiculeMapper';
import { Result, VoidResult } from '@shared/Result';
import { AbstractMongoRepository } from '../AbstractMongoRepository';

export class MongoVehiculeRepository extends AbstractMongoRepository implements VehiculeRepository {
    protected collectionName: string = "vehicules";

    store(vehicule: Vehicule): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                const vehiculeDocument = VehiculeMapper.toPersistence(vehicule);
                await this.getCollection().insertOne(vehiculeDocument);
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    delete(immatriculation: VehiculeImmatriculation): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ immatriculation: immatriculation });
                await session.commitTransaction();
                return Result.SuccessVoid();
            }
        );
    }

    getByImmatriculation(immatriculation: VehiculeImmatriculation): Promise<Result<Vehicule>> {
        return this.catchError(
            async () => {
                const vehiculeDocument = await this.getCollection().findOne({ immatriculation: immatriculation });
                const vehicule = VehiculeMapper.toDomain(vehiculeDocument);
                if (vehicule instanceof Error) return Result.Failure(vehicule);
                return Result.Success<Vehicule>(vehicule);
            }
        )
    }
}