import { Garage, GarageDTO } from '@domain/maintenance/entities/Garage';
import { MappedEntities, MappedEntity } from "@infrastructure/common/entityMappers/MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class GarageMapper {
    public static toPersistence(garage: Garage): MappedEntity<GarageDTO> {
        return new MappedEntity<GarageDTO>({
            siret: garage.siret.getValue(),
            name: garage.name,
            phoneNumber: garage.phoneNumber,
            address: garage.address,
        })
    }

    public static toDomain(garage: any): Garage | ApplicationException {
        return Garage.fromObject({
            siret: garage.siret,
            name: garage.name,
            phoneNumber: garage.phoneNumber,
            address: garage.address
        })
    }

    public static toPersistenceList(garages: Garage[]): MappedEntities<GarageDTO>[] {
        return new MappedEntities(garages.map(garage => {
            return GarageMapper.toPersistence(garage);
        }))
    }

    public static toDomainList(garages: any[]): Garage[] {
        return garages.map(garage => {
            return GarageMapper.toDomain(garage);
        }).filter(garage => !(garage instanceof Error)) as Garage[];
    }
}