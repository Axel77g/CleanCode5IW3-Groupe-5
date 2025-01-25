import { Dealer, DealerDTO } from "@domain/inventoryManagement/entities/Dealer";
import { Address } from "@domain/shared/value-object/Address";
import { Siret } from "@domain/shared/value-object/Siret";
import { MappedEntities, MappedEntity } from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class DealerMapper {
    static toDomain(dealerRaw: any): Dealer | ApplicationException {
        const dealerAddress = Address.create({
            street: dealerRaw.address.street,
            city: dealerRaw.address.city,
            postalCode: dealerRaw.address.postalCode,
            country: dealerRaw.address.country
        })
        if (dealerAddress instanceof ApplicationException) return dealerAddress;
        const siret = Siret.create(dealerRaw.siret);
        if (siret instanceof ApplicationException) return siret;
        return new Dealer(
            siret,
            dealerRaw.name,
            dealerAddress,
            dealerRaw.phoneNumber
        );
    }

    static toPersistence(dealer: Dealer): MappedEntity<DealerDTO> {
        return new MappedEntity<DealerDTO>({
            siret: dealer.siret.getValue(),
            name: dealer.name,
            address: {
                street: dealer.address.street,
                city: dealer.address.city,
                postalCode: dealer.address.postalCode,
                country: dealer.address.country,
            },
            phoneNumber: dealer.phoneNumber
        })
    }

    static toDomainList(dealersRaw: any[]): Dealer[] {
        return dealersRaw.map(dealer => {
            return DealerMapper.toDomain(dealer);
        }).filter(dealer => !(dealer instanceof Error)) as Dealer[];
    }

    static toPersistenceList(dealers: Dealer[]): MappedEntities<DealerDTO> {
        return new MappedEntities(dealers.map(dealer => {
            return DealerMapper.toPersistence(dealer);
        }))
    }

}