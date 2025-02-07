import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {Maintenance} from "@domain/maintenance/entities/Maintenance";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {MaintenanceMapper} from "@infrastructure/common/entityMappers/MaintenanceMapper";
import {ApplicationException} from "@shared/ApplicationException";
import {PaginatedInput} from "@shared/PaginatedInput";
import {Siret} from "@domain/shared/value-object/Siret";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export class MongoMaintenanceRepository extends AbstractMongoRepository implements MaintenanceRepository {
    protected collectionName: string = "maintenances";

    async store(maintenance: Maintenance): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({maintenanceId: maintenance.maintenanceId}, {$set: MaintenanceMapper.toPersistence(maintenance)}, {upsert: true});
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
                await this.getCollection().updateOne({maintenanceId}, {$set: {status: "done"}});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    getByMaintenanceId(maintenanceId: string): Promise<OptionalResult<Maintenance>> {
        return this.catchError(
            async () => {
                const maintenanceDocument = await this.getCollection().findOne({maintenanceId: maintenanceId});
                if (!maintenanceDocument) return Result.SuccessVoid();
                const maintenance = MaintenanceMapper.toDomain(maintenanceDocument);
                if (maintenance instanceof ApplicationException) return Result.Failure(maintenance);
                return Result.Success<Maintenance>(maintenance);
            }
        )
    }


    listVehiculeMaintenance(vehiculeImmatriculation: VehiculeImmatriculation, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>> {
        const {page, limit} = pagination;
        return this.catchError(async () => {
            const maintenancesDocuments = await this.getCollection().find({vehiculeImmatriculation}).skip((page - 1) * limit).limit(limit).toArray();
            const maintenancesTotal = await this.getCollection().countDocuments({vehiculeImmatriculation});
            const maintenances = MaintenanceMapper.toDomainList(maintenancesDocuments);
            return Result.SuccessPaginated<Maintenance>(maintenances, maintenancesTotal, page, limit);
        })
    }

    listGarageMaintenances(garageSiret: Siret, pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>> {
        const {page, limit} = pagination;
        return this.catchError(async () => {
            const maintenancesDocuments = await this.getCollection().find({garageSiret}).skip((page - 1) * limit).limit(limit).toArray();
            const maintenancesTotal = await this.getCollection().countDocuments({garageSiret});
            const maintenances = MaintenanceMapper.toDomainList(maintenancesDocuments);
            return Result.SuccessPaginated<Maintenance>(maintenances, maintenancesTotal, page, limit);
        })
    }

    async listMaintenance(pagination: PaginatedInput): Promise<PaginatedResult<Maintenance>> {
        const {limit, page} = pagination
        return this.catchError(
            async () => {
                const maintenancesDocuments = await this.getCollection().find().skip((page - 1) * limit).limit(limit).toArray()
                const total = await this.getCollection().countDocuments({})
                const maintenances = MaintenanceMapper.toDomainList(maintenancesDocuments)
                return Result.SuccessPaginated<Maintenance>(maintenances, total, page, limit)
            }
        )
    }
}