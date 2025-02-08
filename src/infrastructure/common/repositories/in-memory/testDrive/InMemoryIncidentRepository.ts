import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {Incident} from "@domain/testDrive/entities/Incident";
import {IncidentRepository} from "@application/testDrive/repositories/IncidentRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";

export class InMemoryIncidentRepository extends AbstractInMemoryRepository<Incident> implements IncidentRepository {
    async listDriverIncidents(driverLicenseId: DriverLicenseId, pagination: PaginatedInput): Promise<PaginatedResult<Incident>> {
        const {page, limit} = pagination;
        const driversIncidents = this.collection
            .filter(incident => incident.driverLicenseId.getValue() === driverLicenseId.getValue())
        const incidents = driversIncidents.paginate(page,limit).toArray();
        const total = driversIncidents.count();
        return Promise.resolve(Result.SuccessPaginated(incidents,total,page,limit));
    }

    async store(incident: Incident): Promise<VoidResult> {
        this.collection.add(incident);
        return Promise.resolve(Result.SuccessVoid());
    }
}