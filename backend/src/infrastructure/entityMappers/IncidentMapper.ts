import {Incident} from "../../domain/testDrive/entities/Incident";
import {IncidentType} from "../../domain/testDrive/enums/IncidentType";
import {DriverLicenseId} from "../../domain/testDrive/value-object/DriverLicenseId";
import {MappedEntities, MappedEntity} from "./MappedEntity";

export class IncidentMapper {
    static toDomain(incidentRaw: any) {
        return new Incident(
            incidentRaw.id,
            new DriverLicenseId(incidentRaw.driver_licence_id),
            incidentRaw.type as IncidentType,
            incidentRaw.description,
            new Date(incidentRaw.date)
        );
    }

    static toPersistence(incident: Incident) : MappedEntity {
        return new MappedEntity({
            id: incident.id,
            driver_licence_id: incident.driverLicenceId.getValue(),
            type: incident.type,
            description: incident.description,
            date: incident.date
        });
    }

    static toDomainList(incidentsRaw: any[]) : Incident[] {
        return incidentsRaw.map(incident => {
            return IncidentMapper.toDomain(incident);
        })
    }

    static toPersistenceList(incidents: Incident[]) : MappedEntities {
        return new MappedEntities(incidents.map(incident => {
            return IncidentMapper.toPersistence(incident);
        }))
    }
}