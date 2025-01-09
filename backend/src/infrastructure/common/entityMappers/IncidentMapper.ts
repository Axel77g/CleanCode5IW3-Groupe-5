import {Incident, IncidentDTO} from "../../../domain/testDrive/entities/Incident";
import {IncidentType} from "../../../domain/testDrive/enums/IncidentType";
import {DriverLicenseId} from "../../../domain/testDrive/value-object/DriverLicenseId";
import {MappedEntities, MappedEntity} from "./MappedEntity";

export class IncidentMapper {
    static toDomain(incidentEventRaw: any) : Incident | Error {
        const driverLicenceId = DriverLicenseId.create(incidentEventRaw.driverLicenceId)
        if(driverLicenceId instanceof Error) return driverLicenceId
        return new Incident(
            incidentEventRaw.incidentId,
            driverLicenceId,
            incidentEventRaw.type as IncidentType,
            incidentEventRaw.description,
            new Date(incidentEventRaw.date)
        );
    }

    static toPersistence(incident: Incident) : MappedEntity<IncidentDTO> {
        return new MappedEntity<IncidentDTO>({
            incidentId: incident.id,
            driverLicenseId: incident.driverLicenseId.getValue(),
            type: incident.type,
            description: incident.description,
            date: incident.date
        });
    }

    static toDomainList(incidentsRaw: any[]) : Incident[] {
        return incidentsRaw.map(incident => {
            return IncidentMapper.toDomain(incident);
        }).filter(incident => !(incident instanceof Error)) as Incident[];
    }

    static toPersistenceList(incidents: Incident[]) : MappedEntities<IncidentDTO> {
        return new MappedEntities(incidents.map(incident => {
            return IncidentMapper.toPersistence(incident);
        }))
    }
}