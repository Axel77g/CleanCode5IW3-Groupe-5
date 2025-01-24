import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {assertError} from "@tests/Utils";

describe("Siret", () => {
    describe("create", () => {
        it("should create a valid Siret when the format is correct", () => {
            const validSiret = "12345678901234";
            const siret = Siret.create(validSiret);

            expect(siret).toBeInstanceOf(Siret);
            expect((siret as Siret).getValue()).toEqual(validSiret);
        });

        it("should return an ApplicationException when the Siret is too short", () => {
            const invalidSiret = "1234567890123"; // 13 digits
            const siret = Siret.create(invalidSiret);

            expect(siret).toBeInstanceOf(ApplicationException);
            assertError(siret as ApplicationException, Siret.errors.SIRET_NOT_VALID);
        });

        it("should return an ApplicationException when the Siret contains letters", () => {
            const invalidSiret = "12345A78901234";
            const siret = Siret.create(invalidSiret);

            expect(siret).toBeInstanceOf(ApplicationException);
            assertError(siret as ApplicationException, Siret.errors.SIRET_NOT_VALID);
        });

        it("should return an ApplicationException when the Siret is empty", () => {
            const invalidSiret = "";
            const siret = Siret.create(invalidSiret);

            expect(siret).toBeInstanceOf(ApplicationException);
            assertError(siret as ApplicationException, Siret.errors.SIRET_NOT_VALID);
        });

        it("should return an ApplicationException when the Siret is too long", () => {
            const invalidSiret = "123456789012345"; // 15 digits
            const siret = Siret.create(invalidSiret);

            expect(siret).toBeInstanceOf(ApplicationException);
            assertError(siret as ApplicationException, Siret.errors.SIRET_NOT_VALID);
        });
    });
});