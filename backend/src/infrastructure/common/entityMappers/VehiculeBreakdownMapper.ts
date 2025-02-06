import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {VehiculeBreakdown, VehiculeBreakdownDTO} from "@domain/maintenance/entities/VehiculeBreakdown";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export class VehiculeBreakdownMapper {
    static toDomain(vehiculeBreakdownRaw: any): VehiculeBreakdown | ApplicationException {
        const vehiculeImmatriculation = VehiculeImmatriculation.create(vehiculeBreakdownRaw.vehiculeImmatriculation)
        if (vehiculeImmatriculation instanceof ApplicationException) return vehiculeImmatriculation
        return VehiculeBreakdown.create({
            vehiculeBreakdownId: vehiculeBreakdownRaw.vehiculeBreakdownId,
            vehiculeImmatriculation: vehiculeImmatriculation,
            description: vehiculeBreakdownRaw.description,
            date: new Date(vehiculeBreakdownRaw.date),
        })
    }

    static toPersistence(vehiculeBreakdowns: VehiculeBreakdown) : MappedEntity<VehiculeBreakdownDTO> {
       return new MappedEntity<VehiculeBreakdownDTO>({
              vehiculeBreakdownId: vehiculeBreakdowns.vehiculeBreakdownId,
              vehiculeImmatriculation: vehiculeBreakdowns.vehiculeImmatriculation.getValue(),
              description: vehiculeBreakdowns.description,
              date: vehiculeBreakdowns.date
       })
    }

    static toDomainList(vehiculeBreakdownsRaw: any[]): VehiculeBreakdown[] {
        return vehiculeBreakdownsRaw.map(vehiculeBreakdown => {
            return VehiculeBreakdownMapper.toDomain(vehiculeBreakdown);
        }).filter(vehiculeBreakdown => !(vehiculeBreakdown instanceof Error)) as VehiculeBreakdown[];
    }

    static toPersistenceList(vehiculeBreakdowns: VehiculeBreakdown[]) : MappedEntity<VehiculeBreakdownDTO>[] {
        return vehiculeBreakdowns.map(vehiculeBreakdown => {
            return VehiculeBreakdownMapper.toPersistence(vehiculeBreakdown);
        })
    }
}