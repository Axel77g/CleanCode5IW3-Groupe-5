import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehiculeBreakdown, VehiculeBreakdownDTO} from "@domain/maintenance/entities/VehiculeBreakdown";
import {ApplicationException} from "@shared/ApplicationException";

export class VehiculeBreakdownMapper {
    static toDomain(vehiculeBreakdownRaw: any): VehiculeBreakdown | ApplicationException {
        return new VehiculeBreakdown(
            vehiculeBreakdownRaw.vehiculeImmatriculation,
            vehiculeBreakdownRaw.description,
            vehiculeBreakdownRaw.date,
            vehiculeBreakdownRaw.maintenanceId,
        );
    }

    static toDomainList(vehiculeBreakdownsRaw: any[]): VehiculeBreakdown[] {
        return vehiculeBreakdownsRaw.map(vehiculeBreakdown => {
            return VehiculeBreakdownMapper.toDomain(vehiculeBreakdown);
        }).filter(vehiculeBreakdown => !(vehiculeBreakdown instanceof Error)) as VehiculeBreakdown[];
    }

    static toPersistence(vehiculeBreakdown: VehiculeBreakdown): MappedEntity<VehiculeBreakdownDTO> {
        return new MappedEntity<VehiculeBreakdownDTO>({
            vehiculeImmatriculation: vehiculeBreakdown.vehiculeImmatriculation.getValue(),
            description: vehiculeBreakdown.description,
            date: vehiculeBreakdown.date,
            maintenanceId: vehiculeBreakdown.maintenanceId
        })
    }
}