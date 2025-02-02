import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehiculeBreakdown, VehiculeBreakdownDTO} from "@domain/maintenance/entities/VehiculeBreakdown";

export class VehiculeBreakdownMapper {
    public static toPersistence(vehiculeBreakdown: VehiculeBreakdown) : MappedEntity<VehiculeBreakdownDTO> {
        return new MappedEntity<VehiculeBreakdownDTO>({
            vehiculeImmatriculation: vehiculeBreakdown.vehiculeImmatriculation.getValue(),
            description: vehiculeBreakdown.description,
            date: vehiculeBreakdown.date,
            maintenanceId: vehiculeBreakdown.maintenanceId
        })
    }
}