import {Maintenance, MaintenanceDTO} from "@domain/maintenance/entities/Maintenance";
import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";

export class MaintenanceMapper {
    public static toDomain(maintenance: any): Maintenance | ApplicationException {
        const vehiculeImmatriculation = VehiculeImmatriculation.create(maintenance.vehiculeImmatriculation);
        if (vehiculeImmatriculation instanceof ApplicationException) return vehiculeImmatriculation;

        return new Maintenance(
            maintenance.maintenanceId,
            vehiculeImmatriculation,
            maintenance.garageSiret,
            maintenance.status,
            maintenance.maintenanceSpareParts,
            maintenance.recommendation,
            maintenance.date
        );
    }

    public static toPersistence(maintenance: Maintenance): MappedEntity<MaintenanceDTO> {
        return new MappedEntity<MaintenanceDTO>({
            maintenanceId: maintenance.maintenanceId,
            vehiculeImmatriculation: maintenance.vehiculeImmatriculation.getValue(),
            garageSiret: maintenance.garageSiret.getValue(),
            status: maintenance.status,
            maintenanceSpareParts: maintenance.maintenanceSpareParts,
            recommendation: maintenance.recommendation,
            date: maintenance.date,
        })
    }
}