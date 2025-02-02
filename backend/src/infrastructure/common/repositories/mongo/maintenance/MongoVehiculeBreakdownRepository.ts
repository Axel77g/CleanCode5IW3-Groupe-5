import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {OptionalResult, Result, VoidResult} from "@shared/Result";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeBreakdownMapper} from "@infrastructure/common/entityMappers/VehiculeBreakdownMapper";

export class MongoVehiculeBreakdownRepository extends AbstractMongoRepository implements VehiculeBreakdownRepository {
    protected collectionName: string = "vehicule-breakdowns";

    async store(vehiculeBreakdown: VehiculeBreakdown): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().insertOne(vehiculeBreakdown);
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    getBreakdownByVehicule(vehiculeImmatriculation: VehiculeImmatriculation): Promise<OptionalResult<VehiculeBreakdown>> {
        return this.catchError(
           async () => {
               const vehiculeBreakdownDocument = await this.getCollection().findOne({vehiculeImmatriculation: vehiculeImmatriculation.getValue()});
               if (!vehiculeBreakdownDocument) return Result.SuccessVoid();
               const vehiculeBreakdown = VehiculeBreakdownMapper.toDomain(vehiculeBreakdownDocument);
                if (vehiculeBreakdown instanceof Error) return Result.Failure(vehiculeBreakdown);
                return Result.Success<VehiculeBreakdown>(vehiculeBreakdown);
           }
        )
    }
}