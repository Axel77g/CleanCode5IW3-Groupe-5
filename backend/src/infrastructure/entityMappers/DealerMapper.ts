import {Dealer} from "../../domain/inventoryManagement/entities/Dealer";
import {MappedEntities, MappedEntity} from "./MappedEntity";
import {DealerAddress} from "../../domain/inventoryManagement/value-object/DealerAddress";
import {Siret} from "../../domain/shared/value-object/Siret";

export class DealerMapper {
    static toDomain(dealerRaw: any) : Dealer {
        const addressObject = JSON.parse(dealerRaw.address);
        const dealerAddress = new DealerAddress(
            addressObject.street,
            addressObject.city,
            addressObject.postalCode,
            addressObject.country
        );
        return new Dealer(
            new Siret(dealerRaw.siret),
            dealerRaw.name,
            dealerAddress,
            dealerRaw.phoneNumber
        );
    }

    static toPersistence(dealer : Dealer) : MappedEntity {
        return new MappedEntity({
            siret: dealer.siret.getValue(),
            name: dealer.name,
            address: JSON.stringify({
                street: dealer.address.street,
                city: dealer.address.city,
                postalCode: dealer.address.postalCode,
                country: dealer.address.country,
            }),
            phoneNumber: dealer.phoneNumber
        })
    }

    static toDomainList(dealersRaw: any[]) : Dealer[] {
        return dealersRaw.map(dealer => {
            return DealerMapper.toDomain(dealer);
        })
    }

    static toPersistenceList(dealers: Dealer[]) : MappedEntities {
        return new MappedEntities(dealers.map(dealer => {
            return DealerMapper.toPersistence(dealer);
        }))
    }

}