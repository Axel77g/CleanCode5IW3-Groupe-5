import { Address, AddressDTO } from "@domain/shared/value-object/Address";
import { Siret } from "@domain/shared/value-object/Siret";

export interface GarageDTO {
    siret: string;
    name: string;
    phoneNumber: string;
    address: AddressDTO;
}

export class Garage {
    private constructor(
        public readonly siret: Siret,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly address: Address,
    ) { }

    static fromObject(object: GarageDTO): Garage | Error {
        const address = Address.create(object.address);
        if (address instanceof Error) return address;
        const siret = Siret.create(object.siret);
        if (siret instanceof Error) return siret;
        return new Garage(
            siret,
            object.name,
            object.phoneNumber,
            address,
        )
    }
}