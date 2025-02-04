import { Garage, GarageDTO } from '@domain/maintenance/entities/Garage';
import { MappedEntities, MappedEntity } from "@infrastructure/common/entityMappers/MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";
import {Address} from "@domain/shared/value-object/Address";
import {Siret} from "@domain/shared/value-object/Siret";

export class GarageMapper {
    static toDomain(garageRaw: any): Garage | ApplicationException {
        const garageAddress = Address.create({
            street: garageRaw.address.street,
            city: garageRaw.address.city,
            postalCode: garageRaw.address.postalCode,
            country: garageRaw.address.country
        })
        if (garageAddress instanceof ApplicationException) return garageAddress;

        const siret = Siret.create(garageRaw.siret);
        if (siret instanceof ApplicationException) return siret;

        return new Garage(
            siret,
            garageRaw.name,
            garageAddress,
            garageRaw.phoneNumber
        );
    }

    static toDomainList(garagesRaw: any[]): Garage[] {
        return garagesRaw.map(garage => {
            return GarageMapper.toDomain(garage);
        }).filter(garage => !(garage instanceof Error)) as Garage[];
    }
    public static toPersistence(garage: Garage): MappedEntity<GarageDTO> {
        return new MappedEntity<GarageDTO>({
            siret: garage.siret.getValue(),
            name: garage.name,
            address: {
                street: garage.address.street,
                city: garage.address.city,
                postalCode: garage.address.postalCode,
                country: garage.address.country
            },
            phoneNumber: garage.phoneNumber,

        })
    }

    public static toPersistenceList(garages: Garage[]): MappedEntities<GarageDTO>[] {
        return new MappedEntities(garages.map(garage => {
            return GarageMapper.toPersistence(garage);
        }))
    }
}