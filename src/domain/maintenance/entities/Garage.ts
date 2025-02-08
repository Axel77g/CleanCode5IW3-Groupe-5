import {Address, AddressDTO} from "@domain/shared/value-object/Address";
import {ApplicationException} from "@shared/ApplicationException";
import {Siret} from "@domain/shared/value-object/Siret";
import {RegisterGarageEvent} from "@domain/maintenance/events/garage/RegisterGarageEvent";
import {UnregisterGarageEvent} from "@domain/maintenance/events/garage/UnregisterGarageEvent";

export interface GarageDTO {
    siret: string,
    name: string,
    address: AddressDTO,
    phoneNumber: string
}

export class Garage {
    constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly address: AddressDTO,
        public readonly phoneNumber: string,
    ) { }

    static fromObject(object: GarageDTO): Garage | ApplicationException {
        const siret = Siret.create(object.siret);
        if (siret instanceof ApplicationException) {
            return siret;
        }

        const address = Address.create(object.address);
        if (address instanceof ApplicationException) {
            return address;
        }

        return new Garage(siret, object.name, object.address, object.phoneNumber);
    }

    static create(object: {
        siret: Siret,
        name: string,
        address: Address,
        phoneNumber: string
    }) {
        return new Garage(object.siret, object.name, object.address, object.phoneNumber);
    }

    update(object:{
        name: string,
        phoneNumber: string
    }) {
        return new Garage(this.siret, object.name, this.address, object.phoneNumber);
    }

    registerEvent(): RegisterGarageEvent {
        return new RegisterGarageEvent({
            siret: this.siret.getValue(),
            name: this.name,
            address: this.address,
            phoneNumber: this.phoneNumber
        })
    }

    unregisterEvent(): UnregisterGarageEvent {
        return new UnregisterGarageEvent({
            siret: this.siret.getValue(),
        })
    }
}