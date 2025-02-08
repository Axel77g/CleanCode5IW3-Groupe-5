import { AddressDTO, Address } from "@domain/shared/value-object/Address";
import { Siret } from "../../shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {RegisterDealerEvent} from "@domain/inventoryManagement/events/RegisterDealerEvent";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";

export interface DealerDTO {
    siret: string,
    name: string,
    address: AddressDTO
    phoneNumber: string
}

export class Dealer {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly address: Address,
        public readonly phoneNumber: string,
    ) { }


    static fromObject(object: DealerDTO): Dealer | ApplicationException {
        const siret = Siret.create(object.siret);
        if (siret instanceof ApplicationException) {
            return siret;
        }
        const address = Address.create(object.address);
        if (address instanceof ApplicationException) {
            return address;
        }

        return new Dealer(siret, object.name, address, object.phoneNumber);
    }

    static create(object: {
        siret: Siret,
        name: string,
        address: Address,
        phoneNumber: string
    }) {
        return new Dealer(object.siret, object.name, object.address, object.phoneNumber);
    }

    registerEvent() : RegisterDealerEvent {
        return new RegisterDealerEvent({
            siret: this.siret.getValue(),
            name: this.name,
            address: this.address,
            phoneNumber: this.phoneNumber
        })
    }

    unregisterEvent() : UnregisterDealerEvent {
        return new UnregisterDealerEvent({
            siret: this.siret.getValue(),
        })
    }
}