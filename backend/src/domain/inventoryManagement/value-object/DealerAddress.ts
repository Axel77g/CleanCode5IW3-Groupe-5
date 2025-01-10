import {ApplicationException} from "../../../shared/ApplicationException";

export interface AddressDTO {
    street: string
    city: string,
    postalCode: string,
    country: string
}

export class DealerAddress{

    static errors = {
        COUNTRY_CODE_NOT_VALID : new ApplicationException("DealerAddress.notValidCountryCode", "The country code n'est pas valide")
    }
    private constructor(
        public readonly street : string,
        public readonly city : string,
        public readonly postalCode : string,
        public readonly country : string
    ) {}

    isValidCountryCode(countryCode : string){
        return countryCode.length === 2;
    }

    static create(payload : AddressDTO) : DealerAddress | Error {
        const address = new DealerAddress(payload.street, payload.city, payload.postalCode, payload.country);
        if(!address.isValidCountryCode(payload.country)){
            return DealerAddress.errors.COUNTRY_CODE_NOT_VALID;
        }
        return address;
    }
}