import {Address} from "@domain/shared/value-object/Address";
import {ApplicationException} from "@shared/ApplicationException";
import {assertError} from "@tests/Utils";

describe("Address.create", () => {
    it("should create a valid Address", () => {
        const validPayload = { street: "123 Main St", city: "Vienne", postalCode: "75001", country: "AU" };
        const address = Address.create(validPayload);
        expect(address).toBeInstanceOf(Address);
    });

    it("should return an error for invalid country code", () => {
        const invalidPayload = { street: "123 Main St", city: "Lyon", postalCode: "75001", country: "FRA" };
        const address = Address.create(invalidPayload);
        assertError(address as ApplicationException, Address.errors.COUNTRY_CODE_NOT_VALID);
    });
});