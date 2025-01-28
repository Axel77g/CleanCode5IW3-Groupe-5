import { Address, AddressDTO } from "@domain/shared/value-object/Address";
import { Siret } from "@domain/shared/value-object/Siret";
import { ApplicationException } from "@shared/ApplicationException";
import { RegisterGarageEvent } from "../events/garage/RegisterGarageEvent";
import { UnregisterGarageEvent } from "../events/garage/UnregisterGarageEvent";

export interface GarageDTO {
    siret: string;
    name: string;
    phoneNumber: string;
    address: AddressDTO;
}

export class Garage {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly address: Address,
    ) { }

    static fromObject(object: GarageDTO): Garage | ApplicationException {
        const address = Address.create(object.address);
        if (address instanceof ApplicationException) {
            return address;
        }
        const siret = Siret.create(object.siret);
        if (siret instanceof ApplicationException) {
            return siret;
        }

        return new Garage(siret, object.name, object.phoneNumber, address);
    }

    static create(object: {
        siret: Siret,
        name: string,
        phoneNumber: string,
        address: Address
    }) {
        return new Garage(object.siret, object.name, object.phoneNumber, object.address);
    }

    registerEvent(): RegisterGarageEvent {
        return new RegisterGarageEvent({
            siret: this.siret.getValue(),
            name: this.name,
            phoneNumber: this.phoneNumber,
            address: this.address
        })
    }

    unregisterEvent(): UnregisterGarageEvent {
        return new UnregisterGarageEvent({
            siret: this.siret.getValue(),
        })
    }

    update(object: {
        name: string,
        phoneNumber: string,
        address: Address
    }) {
        return new Garage(this.siret, object.name, object.phoneNumber, object.address);
    }
}