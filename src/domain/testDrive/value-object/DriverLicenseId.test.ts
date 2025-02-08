import { DriverLicenseId } from "./DriverLicenseId";
import { ApplicationException } from "@shared/ApplicationException";
import {assertError} from "@tests/Utils";

describe("DriverLicenseId", () => {
    describe("create", () => {
        it("should create a valid DriverLicenseId when input is valid", () => {
            const validId = "A123456789012";
            const driverLicense = DriverLicenseId.create(validId);
            expect(driverLicense).toBeInstanceOf(DriverLicenseId);
            expect((driverLicense as DriverLicenseId).getValue()).toBe(validId);
        });

        it("should return an ApplicationException when input is invalid", () => {
            const invalidId = "1234567890123"; // Ne commence pas par une lettre majuscule
            const driverLicense = DriverLicenseId.create(invalidId);
            expect(driverLicense).toBeInstanceOf(ApplicationException);
            assertError(
                driverLicense as ApplicationException,
                DriverLicenseId.errors.NOT_VALID
            );
        });
    });

    describe("isValid", () => {
        it("should return true for a valid driver license ID", () => {
            const validId = "B987654321098";
            const driverLicense = DriverLicenseId.create(validId) as DriverLicenseId;
            expect(driverLicense.isValid()).toBe(true);
        });

        it("should return false for an invalid driver license ID", () => {
            const invalidId = "X12345"; // Pas assez de caractères
            const driverLicense = DriverLicenseId.create(invalidId) as ApplicationException;
            expect((driverLicense as ApplicationException).equals(DriverLicenseId.errors.NOT_VALID)).toBe(true);
        });
    });

    describe("getValue", () => {
        it("should return the correct value", () => {
            const validId = "C987654321098";
            const driverLicense = DriverLicenseId.create(validId) as DriverLicenseId;
            expect(driverLicense.getValue()).toBe(validId);
        });
    });
});
