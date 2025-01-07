import { Garage } from "../../domain/maintenance/entities/Garage";
import { GarageAddress } from '../../domain/maintenance/value-object/GarageAddress';
import { MappedEntity } from "./MappedEntity";

export class GarageMapper {
    public static toPersistence(garage: Garage): MappedEntity {
        return new MappedEntity({
            siret: garage.siret.getValue(),
            name: garage.name,
            phone_number: garage.phoneNumber,
            address: garage.address,
        })
    }

    public static toDomain(garage: any) {
        return new Garage(
            garage.siret,
            garage.name,
            garage.phone_number,
            new GarageAddress(
                garage.address.street,
                garage.address.city,
                garage.address.postalCode,
                garage.address.country
            )
        )
    }

    public static toPersistenceList(garages: Garage[]): MappedEntity[] {
        return garages.map(garage => {
            return GarageMapper.toPersistence(garage);
        })
    }

    public static toDomainList(garages: any[]) {
        return garages.map(garage => {
            return GarageMapper.toDomain(garage);
        })
    }
}