import {Maintenance, MaintenanceDTO} from "@domain/maintenance/entities/Maintenance";
import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Siret} from "@domain/shared/value-object/Siret";
import {MaintenanceSparePart} from "@domain/maintenance/value-object/MaintenanceSparePart";

export class MaintenanceMapper {
    public static toDomain(maintenance: any): Maintenance | ApplicationException {
        const vehicleImmatriculation = VehicleImmatriculation.create(maintenance.vehicleImmatriculation);
        if (vehicleImmatriculation instanceof ApplicationException) return vehicleImmatriculation;
        const garageSiret = maintenance.garageSiret !== null ? Siret.create(maintenance.garageSiret) : null;
        if(garageSiret instanceof ApplicationException) return garageSiret;

        const maintenanceSpareParts : (ApplicationException | MaintenanceSparePart)[]  = maintenance.maintenanceSpareParts.map((part: any) => {
            return MaintenanceSparePart.create({
                sparePartReference: part.sparePartReference,
                quantity: part.quantity,
                unitPrice: part.unitPrice
            })
        })
        if(maintenanceSpareParts.some(part => part instanceof ApplicationException)) return new ApplicationException("Maintenance.mapper.invalid.spareSpart","Invalid maintenance spare parts");

        return Maintenance.create({
            maintenanceId: maintenance.maintenanceId,
            vehicleImmatriculation,
            garageSiret,
            status : maintenance.status,
            maintenanceSpareParts : maintenanceSpareParts as MaintenanceSparePart[],
            recommendation : maintenance.recommendation,
            date : maintenance.date
        });
    }

    public static toDomainList(maintenances: any[]): Maintenance[] {
        return maintenances.map(maintenance => {
            return MaintenanceMapper.toDomain(maintenance);
        }).filter(maintenance => !(maintenance instanceof Error)) as Maintenance[];
    }

    public static toPersistence(maintenance: Maintenance): MappedEntity<MaintenanceDTO> {
        return new MappedEntity<MaintenanceDTO>({
            maintenanceId: maintenance.maintenanceId,
            vehicleImmatriculation: maintenance.vehicleImmatriculation.getValue(),
            garageSiret: maintenance.garageSiret?.getValue() || null,
            status: maintenance.status,
            maintenanceSpareParts: maintenance.maintenanceSpareParts,
            recommendation: maintenance.recommendation,
            date: maintenance.date,
        })
    }
}