import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {OptionalResult, Result, VoidResult} from "@shared/Result";
import {MaintenanceMapper} from "@infrastructure/common/entityMappers/MaintenanceMapper";
import {ApplicationException} from "@shared/ApplicationException";

export class MongoMaintenanceRepository extends AbstractMongoRepository implements MaintenanceRepository {
    protected collectionName: string = "maintenances";

    async store(maintenance: Maintenance): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ maintenanceId: maintenance.maintenanceId }, { $set: MaintenanceMapper.toPersistence(maintenance) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    async update(maintenanceId: string): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ maintenanceId }, { $set: { status: "done" } });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>> {
        return this.catchError(
            async () => {
                const maintenanceDocument = await this.getCollection().findOne({ maintenanceId: maintenanceId });
                if (!maintenanceDocument) return Result.SuccessVoid();
                const maintenance = MaintenanceMapper.toDomain(maintenanceDocument);
                if (maintenance instanceof ApplicationException) return Result.Failure(maintenance);
                return Result.Success<Maintenance>(maintenance);
            }
        )
    }

    async listVehiculeMaintenance(vehiculeImmatriculation: string): Promise<VoidResult> {
        return this.catchError(
            async () => {
                const maintenances = await this.getCollection().find({ vehiculeImmatriculation }).toArray();
                if (maintenances.length === 0) return Result.SuccessVoid();
                return Result.SuccessVoid();
            }
        )
    }
}