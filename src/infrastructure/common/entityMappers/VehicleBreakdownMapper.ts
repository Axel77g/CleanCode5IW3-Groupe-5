import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehicleBreakdown, VehicleBreakdownDTO} from "@domain/maintenance/entities/VehicleBreakdown";
import {ApplicationException} from "@shared/ApplicationException";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

export class VehicleBreakdownMapper {
    static toDomain(vehicleBreakdownRaw: any): VehicleBreakdown | ApplicationException {
        const vehicleImmatriculation = VehicleImmatriculation.create(vehicleBreakdownRaw.vehicleImmatriculation)
        if (vehicleImmatriculation instanceof ApplicationException) return vehicleImmatriculation
        return VehicleBreakdown.create({
            vehicleBreakdownId: vehicleBreakdownRaw.vehicleBreakdownId,
            vehicleImmatriculation: vehicleImmatriculation,
            description: vehicleBreakdownRaw.description,
            date: new Date(vehicleBreakdownRaw.date),
            maintenanceId: vehicleBreakdownRaw.maintenanceId
        })
    }

    static toPersistence(vehicleBreakdowns: VehicleBreakdown) : MappedEntity<VehicleBreakdownDTO> {
       return new MappedEntity<VehicleBreakdownDTO>({
              vehicleBreakdownId: vehicleBreakdowns.vehicleBreakdownId,
              vehicleImmatriculation: vehicleBreakdowns.vehicleImmatriculation.getValue(),
              description: vehicleBreakdowns.description,
              date: vehicleBreakdowns.date,
              maintenanceId: vehicleBreakdowns.maintenanceId,
       })
    }

    static toDomainList(vehicleBreakdownsRaw: any[]): VehicleBreakdown[] {
        return vehicleBreakdownsRaw.map(vehicleBreakdown => {
            return VehicleBreakdownMapper.toDomain(vehicleBreakdown);
        }).filter(vehicleBreakdown => !(vehicleBreakdown instanceof Error)) as VehicleBreakdown[];
    }

    static toPersistenceList(vehicleBreakdowns: VehicleBreakdown[]) : MappedEntity<VehicleBreakdownDTO>[] {
        return vehicleBreakdowns.map(vehicleBreakdown => {
            return VehicleBreakdownMapper.toPersistence(vehicleBreakdown);
        })
    }
}