import { AddressDTO, DealerAddress } from "@domain/shared/value-object/DealerAddress";
import { Siret } from "../../shared/value-object/Siret";

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
        public readonly address: DealerAddress,
        public readonly phoneNumber: string,
    ) { }


    static fromObject(object: DealerDTO): Dealer | Error {
        const siret = Siret.create(object.siret);
        if (siret instanceof Error) {
            return siret;
        }
        const address = DealerAddress.create(object.address);
        if (address instanceof Error) {
            return address;
        }

        return new Dealer(siret, object.name, address, object.phoneNumber);
    }
}