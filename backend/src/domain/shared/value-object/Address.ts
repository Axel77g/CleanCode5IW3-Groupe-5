import { ApplicationException } from "@shared/ApplicationException";

export interface AddressDTO {
    street: string
    city: string,
    postalCode: string,
    country: string
}

export class Address {

    static errors = {
        COUNTRY_CODE_NOT_VALID: new ApplicationException("Address.notValidCountryCode", "The country code n'est pas valide"),
        CITY_NOT_VALID: new ApplicationException("Address.notValidCity", "The city n'est pas valide"),
        POSTAL_CODE_NOT_VALID: new ApplicationException("Address.notValidPostalCode", "The postal code n'est pas valide"),
        STREET_NOT_VALID: new ApplicationException("Address.notValidStreet", "The street n'est pas valide")
    }
    private constructor(
        public readonly street: string,
        public readonly city: string,
        public readonly postalCode: string,
        public readonly country: string
    ) { }

    isValidCountryCode(countryCode: string) {
        return countryCode.length === 2;
    }

    isValidCity(city: string) {
        return city.length > 0;
    }

    isValidPostalCode(postalCode: string) {
        return postalCode.length == 5;
    }

    isValidStreet(street: string) {
        return street.length > 0;
    }

    static create(payload: AddressDTO): Address | ApplicationException {
        const address = new Address(payload.street, payload.city, payload.postalCode, payload.country);
        if (!address.isValidCountryCode(payload.country)) {
            return Address.errors.COUNTRY_CODE_NOT_VALID;
        }
        if (!address.isValidCity(payload.city)) {
            return Address.errors.CITY_NOT_VALID;
        }
        if (!address.isValidPostalCode(payload.postalCode)) {
            return Address.errors.POSTAL_CODE_NOT_VALID;
        }
        if (!address.isValidStreet(payload.street)) {
            return Address.errors.STREET_NOT_VALID;
        }

        return address;
    }
}