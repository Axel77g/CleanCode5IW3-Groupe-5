import { AddressDTO, DealerAddress } from "@domain/shared/value-object/DealerAddress";

export interface CustomerDTO {
    customerId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: AddressDTO;
}

export class Customer {
    private constructor(
        public readonly customerId: string,
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly address: DealerAddress,
    ) { }

    static fromObject(object: CustomerDTO): Customer | Error {
        const address = DealerAddress.create(object.address);
        if (address instanceof Error) return address;
        return new Customer(
            object.customerId,
            object.name,
            object.phoneNumber,
            object.email,
            address,
        )
    }
}