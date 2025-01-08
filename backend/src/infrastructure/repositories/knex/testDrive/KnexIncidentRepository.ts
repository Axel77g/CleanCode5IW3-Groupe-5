import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {IncidentRepository} from "../../../../application/testDrive/repositories/IncidentRepository";
import { Incident } from "../../../../domain/testDrive/entities/Incident";
import { DriverLicenseId } from "../../../../domain/testDrive/value-object/DriverLicenseId";
import { PaginatedInput } from "../../../../shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "../../../../shared/Result";
import {IncidentMapper} from "../../../entityMappers/IncidentMapper";

export class KnexIncidentRepository extends AbstractKnexRepository implements IncidentRepository {
    tableName = 'incidents';

    async listDriverIncidents(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<Incident>> {
        const {page , limit} = pagination;
        try{
            const incidents = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .select('*')
                .offset(page)
                .limit(limit) as any[];

            const total = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .count('* as total').first() as any;

            const mappedIncidents = IncidentMapper.toDomainList(incidents);
            return Result.SuccessPaginated(mappedIncidents, total.total, page, limit);
        }catch (error){
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
    async store(incident: Incident): Promise<VoidResult> {
        const transaction = await this.connection.transaction()
        try {
            await transaction
                .insert(IncidentMapper.toPersistence(incident))
                .into(this.tableName);
            transaction.commit();
            return Result.SuccessVoid();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown Error";
            return Result.FailureStr(message);
        }
    }
}