import { IncidentRepository } from "@application/testDrive/repositories/IncidentRepository";
import { Incident } from "@domain/testDrive/entities/Incident";
import { DriverLicenseId } from "@domain/testDrive/value-object/DriverLicenseId";
import { IncidentMapper } from "@infrastructure/common/entityMappers/IncidentMapper";
import { PaginatedInput } from "@shared/PaginatedInput";
import { PaginatedResult, Result, VoidResult } from "@shared/Result";
import { AbstractMongoRepository } from "../AbstractMongoRepository";

export class MongoIncidentRepository extends AbstractMongoRepository implements IncidentRepository {
    protected collectionName: string = 'incidents';
    async listDriverIncidents(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<Incident>> {
        const { page, limit } = pagination;
        return this.catchError(
            async () => {
                const incidentsDocuments = await this.getCollection().find({ driverLicenseId: driverLicenseId.getValue() })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .toArray();
                const total = await this.getCollection().countDocuments({ driverLicenseId: driverLicenseId.getValue() })
                const incidents = IncidentMapper.toDomainList(incidentsDocuments);
                return Result.SuccessPaginated<Incident>(incidents, total, page, limit);
            }
        )
    }
    async store(incident: Incident): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne({ incidentId: incident.incidentId }, { $set: IncidentMapper.toPersistence(incident) }, { upsert: true });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }
}