import {Incident, IncidentDTO} from "@domain/testDrive/entities/Incident";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {MappedEntities, MappedEntity} from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class IncidentMapper {
    static toDomain(incidentEventRaw: any) : Incident | ApplicationException {
        const driverLicenceId = DriverLicenseId.create(incidentEventRaw.driverLicenceId)
        if(driverLicenceId instanceof ApplicationException) return driverLicenceId
        return Incident.create({
            incidentId: incidentEventRaw.incidentId,
            driverLicenseId: driverLicenceId,
            type: incidentEventRaw.type,
            description: incidentEventRaw.description,
            date: incidentEventRaw.date
        })

    }

    static toPersistence(incident: Incident) : MappedEntity<IncidentDTO> {
        return new MappedEntity<IncidentDTO>({
            incidentId: incident.incidentId,
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