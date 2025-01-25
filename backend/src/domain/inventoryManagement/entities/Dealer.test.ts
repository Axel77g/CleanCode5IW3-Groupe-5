import {Dealer} from "@domain/inventoryManagement/entities/Dealer";
import {ApplicationException} from "@shared/ApplicationException";
import {assertError, generateAddressDTO, generateDealerDTO} from "@tests/Utils";
import {Siret} from "@domain/shared/value-object/Siret";
import {Address} from "@domain/shared/value-object/Address";
import {RegisterDealerEvent} from "@domain/inventoryManagement/events/RegisterDealerEvent";
import {UnregisterDealerEvent} from "@domain/inventoryManagement/events/UnregisterDealerEvent";

describe('Dealer.fromObject', () => {
    it('should return a Dealer when provided with a valid DealerDTO', () => {
        const dto = generateDealerDTO();
        const dealer = Dealer.fromObject(dto);
        expect(dealer).toBeInstanceOf(Dealer);
    });

    it('should return an ApplicationException when SIRET is invalid', () => {
        const dto = generateDealerDTO({ siret: "INVALID_SIRET" });
        const dealer = Dealer.fromObject(dto) as ApplicationException;
        expect(dealer).toBeInstanceOf(ApplicationException);
        assertError(dealer, Siret.errors.SIRET_NOT_VALID);
    });

    it('should return an ApplicationException when Address is invalid', () => {
        const dto = generateDealerDTO({
            address: generateAddressDTO({ country :"France", postalCode: "INVALID_POSTAL_CODE" })
        });
        const dealer = Dealer.fromObject(dto) as ApplicationException;
        expect(dealer).toBeInstanceOf(ApplicationException);
        assertError(dealer, Address.errors.COUNTRY_CODE_NOT_VALID);
    });
});

describe('Dealer.create', () => {
    it('should create a Dealer when provided with valid inputs', () => {
        const siret = Siret.create("12345678901234") as Siret;
        const address = Address.create(generateAddressDTO()) as Address;
        const dealer = Dealer.create({
            siret,
            name: "Valid Dealer",
            address,
            phoneNumber: "0123456789"
        });

        expect(dealer).toBeInstanceOf(Dealer);
        expect(dealer.name).toBe("Valid Dealer");
        expect(dealer.phoneNumber).toBe("0123456789");
    });

});

describe('Dealer.registerEvent', () => {
    it('should return a RegisterDealerEvent with the correct properties', () => {
        const siret = Siret.create("12345678901234") as Siret;
        const address = Address.create(generateAddressDTO()) as Address;
        const dealer = Dealer.create({
            siret,
            name: "Dealer for Event",
            address,
            phoneNumber: "0123456789"
        });

        const event = dealer.registerEvent();
        expect(event).toBeInstanceOf(RegisterDealerEvent);
        expect(event.payload.siret).toBe(siret.getValue());
        expect(event.payload.name).toBe("Dealer for Event");
        expect(event.payload.address).toEqual(address);
        expect(event.payload.phoneNumber).toBe("0123456789");
    });
});

describe('Dealer.unregisterEvent', () => {
    it('should return an UnregisterDealerEvent with the correct SIRET', () => {
        const siret = Siret.create("12345678901234") as Siret;
        const address = Address.create(generateAddressDTO()) as Address;
        const dealer = Dealer.create({
            siret,
            name: "Dealer for Event",
            address,
            phoneNumber: "0123456789"
        });

        const event = dealer.unregisterEvent();
        expect(event).toBeInstanceOf(UnregisterDealerEvent);
        expect(event.payload.siret).toBe(siret.getValue());
    });
});
