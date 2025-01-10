import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {IncidentRepository} from "../../../../../application/testDrive/repositories/IncidentRepository";
import {DriverLicenseId} from "../../../../../domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "../../../../../shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "../../../../../shared/Result";
import {Incident} from "../../../../../domain/testDrive/entities/Incident";
import {IncidentMapper} from "../../../entityMappers/IncidentMapper";

export class MongoIncidentRepository extends AbstractMongoRepository implements IncidentRepository{
    protected collectionName: string = 'incidents';
    async listDriverIncidents(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<Incident>> {
        const {page, limit} = pagination;
        try{
            const incidentsDocuments = await this.getQuery().find({driverLicenseId: driverLicenseId.getValue()})
                .skip((page - 1) * limit)
                .limit(limit)
                .toArray();
            const total = await this.getQuery().countDocuments({driverLicenseId: driverLicenseId.getValue()})
            const incidents = IncidentMapper.toDomainList(incidentsDocuments);
            return Result.SuccessPaginated<Incident>(incidents,total, page, limit);
        }catch (e) {
            const message = e instanceof Error ? e.message : "An error occurred while fetching incidents";
            return Result.FailureStr(message);
        }
    }
    async store(incident: Incident): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        try{
            session.startTransaction();
            await this.getQuery().updateOne({incidentId: incident.incidentId}, {$set: IncidentMapper.toPersistence(incident)}, {upsert: true});
            await session.commitTransaction();
            return Result.SuccessVoid();
        }catch (e){
            await session.abortTransaction();
            const message = e instanceof Error ? e.message : "An error occurred while storing incident";
            return Result.FailureStr(message);
        }
    }
}